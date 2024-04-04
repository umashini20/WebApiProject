const Weather = require('../model/Weather')
const cron = require('node-cron');

const getAllWeatherData = async (req, res) => {
   const weather = await Weather.find();
   if(!weather) return res.status(204).json({'message': 'No weather data found'});
   res.json(weather);
}

const createNewWeatherData = async (req, res) => {
    if (!req?.body?.district || !req?.body?.latitude || !req?.body?.longitude || !req?.body?.humidity || !req?.body?.temperature || !req?.body?.airPressure) {
        return res.status(400).json({'message': 'Humidity, temperature and air pressure required'})
    }

    try {
        const result = await Weather.create({
            district: req.body.district,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            humidity: req.body.humidity,
            temperature: req.body.temperature,
            airPressure: req.body.airPressure
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
   
  
}



const deleteWeatherData =async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'ID is required'});
   
    const weather = await Weather.findOne({ _id: req.body.id}).exec();
   if (!weather) {
        return res.status(204).json({"message": `Weather ID ${req.body.id} not found`});

   }
   const result = await weather.deleteOne({ _id: req.body.id});
   res.json(result);
}

// const updateWeatherData = async (req, res) => {
//     try {
//         // Take latitude and longitude from the request parameters
//         const { latitude, longitude } = req.params;
//         const radius = 0.1; 
//         // Find weather data by latitude and longitude
//         const weather = await Weather.find({ 
//             latitude: { $gte: parseFloat(latitude) - radius, $lte: parseFloat(latitude) + radius },
//             longitude: { $gte: parseFloat(longitude) - radius, $lte: parseFloat(longitude) + radius }
//          }).exec();
         
//         if (!weather || weather.length === 0) {
//             return res.status(204).json({ "message": `Weather data not found for latitude ${latitude} and longitude ${longitude}` });
//         }

//         // Find the nearest weather data point
//         let nearestWeather = weather[0];
//         let minDistance = calculateDistance(latitude, longitude, nearestWeather.latitude, nearestWeather.longitude);
//         for (let i = 1; i < weather.length; i++) {
//             const distance = calculateDistance(latitude, longitude, weather[i].latitude, weather[i].longitude);
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 nearestWeather = weather[i];
//             }
//         }

//         // Update weather data if provided in the request body
//         if (req.body?.humidity) nearestWeather.humidity = req.body.humidity;
//         if (req.body?.temperature) nearestWeather.temperature = req.body.temperature;
//         if (req.body?.airPressure) nearestWeather.airPressure = req.body.airPressure;

//         // Save the updated weather data
//         const result = await nearestWeather.save();
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ 'message': 'Internal Server Error' });
//     }
// };


const updateWeatherData = async (req, res) => {
    try {
        const { latitude, longitude } = req.params;

        // Find weather data by latitude and longitude
        const weather = await Weather.findOne({ latitude, longitude }).exec();
        
        if (!weather) {
            return res.status(204).json({ "message": `Weather data not found for latitude ${latitude} and longitude ${longitude}` });
        }

        // Update weather data if provided in the request body
        if (req.body?.humidity) weather.humidity = req.body.humidity;
        if (req.body?.temperature) weather.temperature = req.body.temperature;
        if (req.body?.airPressure) weather.airPressure = req.body.airPressure;

        // Save the updated weather data
        const result = await weather.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};


const getWeather = async (req, res) => {
    try {
        const { latitude, longitude } = req.params;

        // Find weather data points within a small radius (e.g., 0.1 degrees)
        const radius = 0.1; // Adjust this value as needed
        const weather = await Weather.find({
            latitude: { $gte: parseFloat(latitude) - radius, $lte: parseFloat(latitude) + radius },
            longitude: { $gte: parseFloat(longitude) - radius, $lte: parseFloat(longitude) + radius }
        }).exec();

        if (weather.length === 0) {
            return res.status(204).json({ "message": `No weather data found for the clicked location` });
        }

        // If multiple data points are found, choose the nearest one
        let nearestWeather = weather[0];
        let minDistance = calculateDistance(latitude, longitude, nearestWeather.latitude, nearestWeather.longitude);
        for (let i = 1; i < weather.length; i++) {
            const distance = calculateDistance(latitude, longitude, weather[i].latitude, weather[i].longitude);
            if (distance < minDistance) {
                minDistance = distance;
                nearestWeather = weather[i];
            }
        }

        res.json(nearestWeather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = degreesToRadians(lat1);
    const lon1Rad = degreesToRadians(lon1);
    const lat2Rad = degreesToRadians(lat2);
    const lon2Rad = degreesToRadians(lon2);

    // Calculate differences
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    // Calculate distance using Haversine formula
    const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance; // Distance in kilometers
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}


const getWeatherLongLat = async (req, res) => {
    try {
        // const { latitude, longitude } = req.query;
        // console.log('Latitude:', latitude);
        // console.log('Longitude:', longitude);

        if (!req?.body?.latitude || !req?.body?.longitude) {
            return res.status(400).json({ 'message': 'Latitude and longitude are required'});
        }

        const { latitude, longitude } = req.body;
        const weather = await Weather.findOne({ latitude, longitude }).exec();
        console.log('Weather:', weather);

        if (!weather) {
            return res.status(204).json({"message": `Weather data not found for latitude ${latitude} and longitude ${longitude}` });
        }
        res.json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
}



module.exports = {
    getAllWeatherData,
    createNewWeatherData,
    updateWeatherData,
    deleteWeatherData,
    getWeather,
    getWeatherLongLat
}