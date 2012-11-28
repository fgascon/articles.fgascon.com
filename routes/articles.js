var clientAppUtil = require('../lib/clientAppUtil');
var Article = require('../models/article').Model;

module.exports = function(app){
	
	app.get('/:auth/create', createArticle);
	
	function createArticle(req, res){
		parseClient(req, res, function(client){
			
			var article = new Article();
			
			article.set({
				clientId: client.get('id'),
				title:"test1212",
				body:"My content here."
			});
			
			article.save(function(err){
				if(err){
					res.json(500, {
						message:err
					});
				}else{
					showArticle(article);
				}
			});
			
		});
	}
	
	function showArticle(req, res, article){
		res.json({
			data:{
				title: article.get('title'),
				body: article.get('body'),
				publishDate: article.get('publishDate')
			}
		});
	}
	
	function parseClient(req, res, cb){
		clientAppUtil.parse(req.params.auth, function(err, client){
			if(err){
				res.json(403, {
					message: err
				});
			}else{
				cb(client);
			}
		});
	}
	
};