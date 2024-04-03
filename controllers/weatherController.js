const Weather = require('../model/Weather')
const getAllWeatherData = async (req, res) => {
   const weather = await Weather.find();
   if(!weather) return res.status(204).json({'message': 'No weather data found'});
   res.json(weather);
}

const createNewWeatherData = async (req, res) => {
    if (!req?.body?.humidity || !req?.body?.temperature || !req?.body?.airPressure) {
        return res.status(400).json({'message': 'Humidity, temperature and air pressure required'})
    }

    try {
        const result = await Weather.create({
            humidity: req.body.humidity,
            temperature: req.body.temperature,
            airPressure: req.body.airPressure
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
   
  
}

const updateWeatherData = async (req, res) => {
   if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID is required'});
   }
   const weather = await Weather.findOne({ _id: req.body.id}).exec();
   if (!weather) {
        return res.status(204).json({ "message": `Weather ID ${req.body.id} not found`});

   }
   if (req.body?.humidity) weather.humidity = req.body.humidity;
   if (req.body?.temperature) weather.temperature = req.body.temperature;
   if (req.body?.airPressure) weather.airPressure = req.body.airPressure;

   const result = await weather.save();
   res.json(data.weather);
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

const getWeather = async (req,res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'ID is required'});
    const weather = await Weather.findOne({ _id: req.params.id}).exec();
    if (!weather) {
        return res.status(204).json({"message": `Weather ID ${req.params.id} not found` });
    }
    res.json(weather);
}


module.exports = {
    getAllWeatherData,
    createNewWeatherData,
    updateWeatherData,
    deleteWeatherData,
    getWeather
}