const express = require('express');
const router = express.Router();
const regsiterController = require('../controllers/registerController');

router.post('/', regsiterController.handleNewUser);


module.exports = router;