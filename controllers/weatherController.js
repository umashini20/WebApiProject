const data = {
   weather:  require('../model/weather.json'),
   setWeather: function (data) { this.weather = data}
};



const getAllWeatherData = (req, res) => {
    res.json(data.weather);
}

const createNewWeatherData = (req, res) => {
   const newWeather = {
        id: data.weather[data.weather.length - 1].id + 1 || 1,
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        airPressure: req.body.airPressure
   }

   if (!newWeather.humidity || !newWeather.temperature || !newWeather.airPressure) {
        return res.status(400).json({'message': 'Humidity, temperature and air pressure required'});
   }

   data.setWeather([...data.weather, newWeather]);
   res.status(201).json(data.weather);
}

const updateWeatherData = (req, res) => {
   const weather = data.weather.find(wea => wea.id === parseInt(req.body.id));
   if (!weather) {
        return res.status(400).json({ "message": `Weather ID ${req.body.id} not found`});

   }
   if (req.body.humidity) weather.humidity = req.body.humidity;
   if (req.body.temperature) weather.temperature = req.body.temperature;
   if (req.body.airPressure) weather.airPressure = req.body.airPressure;

   const filterArray = data.weather.filter(wea => wea.id !== parseInt(req.body.id));
   const unsortedArray = [...filterArray, weather];
   data.setWeather(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
   res.json(data.weather);
}

const deleteWeatherData = (req, res) => {
   const weather = data.weather.find(wea => wea.id === parseInt(req.body.id));
   if (!weather) {
        return res.status(400).json({"message": `Weather ID ${req.body.id} not found`});

   }
   const filterArray = data.weather.filter(wea => wea.id !== parseInt(req.body.id));
   data.setWeather([...filterArray]);
   res.json(data.weather);
}

const getWeather = (req,res) => {
    const weather = data.weather.find(wea => wea.id === parseInt(req.params.id));
    if (!weather) {
        return res.status(400).json({"message": `Weather ID ${req.body.id} not found` });
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