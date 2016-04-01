var http = require('http');
var express = require('express');
var app  = express();
var port =process.env.PORT|| 8080;

//Create a server
var server = http.createServer(app);
var chat = require("./server_modules/chat.js")(server);

app.use("/", express.static(__dirname + "/"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/home.html');
});

app.get('/admin', function(req, res){
	res.sendFile(__dirname + '/views/admin.html');
});

app.get('/center', function(req, res){
	res.sendFile(__dirname + '/views/center.html');
});

app.get('/testclient', function(req, res){
	res.sendFile(__dirname + '/views/test-client.html');
});

app.get('/testclient2', function(req, res){
	res.sendFile(__dirname + '/views/test-client-enhanced.html');
});

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
		chat.listen();
    console.log("Server listening on: http://localhost:%s", port);
});
