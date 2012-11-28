var clientAppUtil = require('../lib/clientAppUtil');

module.exports = function(app){
	
	app.get('/', displayAppInfo);
	
	app.post('/app', createAnApp);
	//app.put('/app', createAnApp);
	
	function displayAppInfo(req, res){
		res.json({
			name:app.get('name'),
			version:app.get('version')
		});
	}
	
	function createAnApp(req, res){
		var params = req.body;
		if(!params.name){
			res.json(400, {
				message: "Parameter name missing"
			});
		}else if(!params.secret){
			res.json(400, {
				message: "Parameter secret missing"
			});
		}else{
			clientAppUtil.generate(params.name, params.secret, function(err, client){
				if(err){
					res.json(500, {
						message: err
					});
				}else{
					res.json({
						app: {
							id: client.get('id'),
							name: client.get('name'),
							secret: client.get('secret')
						}
					});
				}
			});
		}
	}
	
};