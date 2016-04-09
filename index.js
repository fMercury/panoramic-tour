var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var fileUpload = require('express-fileupload');
var app  = express();
var port =process.env.PORT|| 8080;

//Create a server
var server = http.createServer(app);
var chat = require("./server_modules/chat.js")(server);
var database = require("./server_modules/database.js")();

app.use(bodyParser());
//File uploading capabilities
app.use(fileUpload());

app.use("/", express.static(__dirname + "/"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/home.html');
});

app.get('/client-admin', function(req, res){
	res.sendFile(__dirname + '/views/client-admin.html');
});

app.get('/center-admin', function(req, res){
	res.sendFile(__dirname + '/views/center-admin.html');
});

app.get('/center', function(req, res){
	res.sendFile(__dirname + '/views/center.html');
});

app.get('/client', function(req, res){
	database.getClients({"web_url" : req.query.url}, function(docs){
		if (!docs.length){
			res.sendFile(__dirname + '/views/error.html');
		}
		else{
			res.sendFile(__dirname + '/views/client.html');
		}
	});
});

app.get('/testclient', function(req, res){
	res.sendFile(__dirname + '/views/test-client.html');
});

app.get('/testclient2', function(req, res){
	res.sendFile(__dirname + '/views/test-client-enhanced.html');
});

//Database calls
app.get('/getClients', function(req, res){
	database.getClients(req.query.query, function(docs){
		res.writeHead("200");
		res.write(JSON.stringify(docs));
		res.end();
	});
});

app.post('/addClient', function(req, res){
	database.addClient(req.body.client, function(){
			res.end();
	});
});

app.post('/uploadImage', function(req, res){
	var sampleFile;
	if (!req.files) {
		res.send('No files were uploaded.');
		return;
	}
	file = req.files.file;
	fs.readFile(file.name, function(err, data) {
	  var path = __dirname + '/resources/logos/' + file.name;
		fs.writeFile(path, file.data, "base64", function(err) {
			if (err){console.log("WRITE ERROR!");};
			res.end();
		});
	});
});

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
		chat.listen();
    console.log("Server listening on: http://localhost:%s", port);
});
