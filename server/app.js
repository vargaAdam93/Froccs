var express = require('express');
var app = express();
var port = 4200;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('localhost:27017/froccs')
    .then(() => { // if all is ok we will be here
        console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required application specific custom router module
var userRouter = require('./src/Routes/userRoutes');
var froccsRouter = require('./src/Routes/froccsRoutes');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/froccs', froccsRouter);
app.use('/users', userRouter);
// Start the server
app.listen(port, function(){
    console.log('Server is running on Port: ',port);
});