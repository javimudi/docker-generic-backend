'use strict';

var Schema = require('mongoose').Schema;


var tagSchema = new Schema({
	tag: String
})


var postSchema = new Schema({
	type: { type: String, enum:['text', 'quote', 'image']},
	title: String,
	content: String,
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]

})


module.exports = {
	tagSchema: tagSchema,
	postSchema: postSchema
}

