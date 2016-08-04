'use strict';

var Schema = require('mongoose').Schema;

var postSchema = new Schema({
	type: { type: String, enum:['text', 'quote', 'image']},
	title: { type: String, required: true},
	content: { type: String, required: true},
	tags: [{ type: String }]

})

module.exports = {
	postSchema: postSchema
}

