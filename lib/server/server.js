/*
 * file: 			server.js
 * description: 	HTTP server
 * author: 			Aaron Stannard
 * created: 		8/12/2013
 * last-modified: 	8/12/2013
 */
var http = require("http");


/*
 * Server prototype
 */
var app = module.exports = function app(options, fs){
	this.port = options.port;
	this.dir = options.dir;
	this.hostname = options.hostname;
	this.readonly = options.readonly;
	this.fs = fs;
	this.router = require("./router")(options, fs);
}

/*
 * Listen method - starts the server
 */
 app.listen = function(){
 	var self = this;
 	var server = http.createServer(router);
 	server.listen(this.port, this.hostname, self.router.listen);
 }