var Client = require('../models/client').Model;
var sequence = require('../models/sequence');

exports.parse = function(auth, cb){
	auth = auth.split('-');
	if(auth.length!=2){
		cb("Invalid app parameter format");
	}else{
		Client.findOne({id: auth[0], secret: auth[1]}, function(err, client){
			if(err){
				cb(err);
			}else{
				cb(null, client);
			}
		});
	}
	return null;
};

exports.generate = function(name, secret, cb){
	var client = new Client();
	sequence.next('clientId', function(err, id){
		if(err){
			cb(err);
		}else{
			client.set({
				id: id,
				name: name,
				secret: secret
			});
			client.save(function(err){
				if(err){
					cb(err);
				}else{
					cb(null, client);
				}
			});
		}
	});
	return null;
};