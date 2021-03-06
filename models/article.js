var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
	clientId: Number,
	title: String,
	body: String,
	publishDate: Date,
	author: String
});

exports.Model = mongoose.model('Article', schema);