'use strict';
var app = require('./app'),
express = require('express'),
router = express.Router();

var ospath = require('path');
var authPath = ospath.join(ospath.dirname(module.filename), "../..", "core/auth/auth.js");

var authStrategy = require(authPath);

// Routes definitions
router.get('/', authStrategy.isAuthenticated, app.get);


module.exports = router;