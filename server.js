const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corseOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

//custom logger

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/weather', require('./routes/api/weather'));


//route handlers

// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html');
//     next()
// }, (req, res) => {
//     res.send('Hello World!');
// })



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
