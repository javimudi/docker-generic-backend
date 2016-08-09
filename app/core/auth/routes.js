'use strict';
var app = require('./app'),
express = require('express'),
router = express.Router();

// Routes definitions
router.get('/users', app.getUsers);
router.post('/users', app.postUser);

module.exports = router;