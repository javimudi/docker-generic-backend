'use strict';

var mongoose = require('mongoose');
var schemas = require('./schemas');

module.exports = {
	Tag: mongoose.model('Tag', schemas.tagSchema),
	Post: mongoose.model('Post', schemas.postSchema)
}
