const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/weatherController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(weatherController.getAllWeatherData)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), weatherController.createNewWeatherData)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), weatherController.updateWeatherData)
    .delete(verifyRoles(ROLES_LIST.Admin), weatherController.deleteWeatherData);

router.route('/:id')
    .get(weatherController.getWeather);

module.exports = router;

