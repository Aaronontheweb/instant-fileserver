/*
 * file: 			router.js
 * description: 	used to route HTTP commands to specific files
 * author: 			Aaron Stannard
 * created: 		8/12/2013
 * last-modified: 	8/12/2013
 */

 var url = require('url');

 /*
  * Router prototype
  */
var router = module.exports = function router(options, fs){
	this.dir = options.dir;
	this.readonly = options.readonly;
	this.fs = fs; //file-system agent
}

 /*
  * Path method - parses the relative file path from the request
  */
router.path = function(req){
	return url.parse(req.url);
}

 /*
  * Output method - writes output to the filestream based on what {fs} returns
  */
router.output = function(err, data, res){
	if(err){
		res.writeHead(err.code, {'Content-Type':'text/plain'});
		res.end(err.message);
		return;
	}

	if(data){
		res.writeHead(data.code, {'Content-Type':data.contentType});
		res.end(data.data);
	}
}

 /*
  * Listen method - used to handle incoming requests
  */
router.listen = function(req, res){
	var self = this;
	var path = self.path(req);
	if(req.method() == "GET"){
		self.fs.read(path, req, function(err, data){
			self.output(err, data, res);
		});
	}
}
