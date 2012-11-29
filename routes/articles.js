var clientAppUtil = require('../lib/clientAppUtil');
var Article = require('../models/article').Model;

module.exports = function(app){
	
	app.get('/:auth/list', listArticle);
	app.post('/:auth/create', createArticle);
	
	function listArticle(req, res){
		parseClient(req, res, function(client){
			
			Article.find({clientId:client.id})
				.select('title body')
				.exec(function(err, articles){
					if(err){
						res.json(500, {
							message: err
						});
					}else{
						var result = [];
						articles.forEach(function(article){
							result.push(article.toObject());
						});
						res.json(result);
					}
				});
			
		});
	}
	
	function createArticle(req, res){
		parseClient(req, res, function(client){
			var params = req.body;
			if(!params.title){
				res.json(400, {
					message: "Parameter title missing"
				});
				
			}else if(!params.body){
				res.json(400, {
					message: "Parameter body missing"
				});
				
			}else if(!params.author){
				res.json(400, {
					message: "Parameter author missing"
				});
				
			}else{
				var article = new Article();
				
				article.set({
					clientId: client.get('id'),
					title: params.title,
					body: params.body,
					author: params.author
				});
				
				article.save(function(err){
					if(err){
						res.json(500, {
							message: err
						});
					}else{
						showArticle(req, res, article);
					}
				});
			}
			
		});
	}
	
	function showArticle(req, res, article){
		res.json({
			data:{
				title: article.get('title'),
				body: article.get('body'),
				author: article.get('author'),
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