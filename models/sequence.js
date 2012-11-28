var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
	name: String,
	nextValue: Number
});

var Sequence = exports.Model = mongoose.model('Sequence', schema);

exports.next = function(name, cb){
	var sequence = Sequence.findOneAndUpdate({
		name: name
	},{
		$inc: {nextValue: 1}
	},{
		upsert: true
	}, function(err, sequence){
		if(err){
			cb(err);
		}else{
			cb(null, sequence.get('nextValue'));
		}
	});
	return null;
};