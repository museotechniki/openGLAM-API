var express = require('express');
var router = express.Router();

var Objects = require('../models/objects');

Objects.methods(['get', 'put', 'post', 'delete']);
Objects.register(router, '/objects');


module.exports = router;
