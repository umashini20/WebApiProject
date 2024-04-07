const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/weatherController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(weatherController.getAllWeatherData)
    .get(weatherController.getWeatherLongLat)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), weatherController.createNewWeatherData)
    .delete(verifyRoles(ROLES_LIST.Admin), weatherController.deleteWeatherData);

router.route('/:latitude/:longitude')
    .get(weatherController.getWeather);

router.route('/:latitude/:longitude')
    .put(weatherController.updateWeatherData)

router.post('/long-lat', weatherController.getWeatherLongLat);

module.exports = router;

