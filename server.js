//Node modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/common');
const methodOverride = require('method-override');

//connect to mongoDB
mongoose.connect(config.database);

//initialise app
const app = express();

//Static directory
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());

//middleware for express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(morgan('dev')); // Log API requests

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//Linking to the Routes
const router = require('./routes');
// Import routes to be served
router(app);

//start server
const server = app.listen(config.port);
  console.log('API is running on port '+ config.port);
