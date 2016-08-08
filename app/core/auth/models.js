'use strict';

var mongoose = require('mongoose'),
UserSchema = require('./schemas');

module.exports = {
	User: mongoose.model('User', UserSchema)
}