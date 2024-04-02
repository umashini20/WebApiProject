const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/weatherController');


router.route('/')
    .get(weatherController.getAllWeatherData)
    .post(weatherController.createNewWeatherData)
    .put(weatherController.updateWeatherData)
    .delete(weatherController.deleteWeatherData);

router.route('/:id')
    .get(weatherController.getWeather);

module.exports = router;

