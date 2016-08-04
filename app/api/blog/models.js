'use strict';

var mongoose = require('mongoose');
var schemas = require('./schemas');

module.exports = {
	Post: mongoose.model('Post', schemas.postSchema)
}
