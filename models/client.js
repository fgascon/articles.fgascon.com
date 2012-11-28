var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
	id: Number,
	name: String,
	secret: String
},{
	_id: false
});

exports.Model = mongoose.model('Client', schema);