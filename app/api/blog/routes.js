'use strict';
var app = require('./app'),
express = require('express'),
router = express.Router();

// Routes definitions
router.get('/', app.fetchall);
router.get('/:id', app.fetchone);
router.post('/', app.create);
router.put('/:id', app.update);
router.delete('/:id', app.drop);

module.exports = router;