const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname,'..' ,'views', 'index.html'));
});

router.get('/newPage(.html)?', (req, res) => {
   
    res.sendFile(path.join(__dirname,'..', 'views', 'newPage.html'));
});

router.get('/old-page(.html)?', (req, res) => {
   
    res.redirect(301, '/newPage.html');
});

module.exports = router;