var http = require('http');
var commander = require('commander');
var express = require('express');
var mongoose = require('mongoose');
var packageFile = require('./package.json');

//argv parsing
commander
	.version(packageFile.version)
	.option('-p, --port [value]', 'Specify a port on wich to run the server', parseInt)
	.option('-d, --db [value]', 'Specify the MongoDB connection string')
	.parse(process.argv);

//DB connection
mongoose.connect(commander.db);

//web server settings
var app = express();

app.configure(function(){
	app.set('name', packageFile.name);
	app.set('version', packageFile.version);
	app.set('port', commander.port || process.env.PORT || 80);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

//setting the routes
require('./routes')(app);

//starting the server
var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log("Server listening on %s:%d", server.address().address, server.address().port);
});