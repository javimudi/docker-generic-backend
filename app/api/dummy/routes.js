'use strict';
var app = require('./app'),
express = require('express'),
router = express.Router();

// Routes definitions
router.get('/', app.get)

module.exports = router;