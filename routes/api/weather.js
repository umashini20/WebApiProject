const express = require('express');
const router = express.Router();
const data = {};
data.weather = require('../../data/weather.json');

router.route('/')
    .get((req, res) => {
        res.json(data.weather);
    })
    .post((req, res) => {
        res.json({
            "humidity": req.body.humidity,
            "temperature": req.body.temperature,
            "airPressure": req.body.airPressure
        });
    })
    .put((req, res) => {
        res.json({
            "humidity": req.body.humidity,
            "temperature": req.body.temperature,
            "airPressure": req.body.airPressure
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id})
    });

router.route('/:id')
    .get((req,res) => {
        res.json({ "id": req.params.id});
    });

module.exports = router;

