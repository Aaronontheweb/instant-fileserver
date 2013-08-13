/*
 * file: 			fileSysAgent.js
 * description: 	used to translate HTTP requests into filesystem commands
 					can be sub-classed to work with other types of file systems, like Amazon S3.

 * author: 			Aaron Stannard
 * created: 		8/12/2013
 * last-modified: 	8/12/2013
 */

var fs = require('fs'),
	path = require('path'); //built-in filesystem

var mmm = require('mmmagic'), //MIME-type detection
  Magic = mmm.Magic;

var magic = new Magic(mmm.MAGIC_MIME_TYPE | mmm.MAGIC_MIME_ENCODING);

require('../util/string');

var fileSysAgent = module.exports = function fileSysAgent(options){
	this.dir = options.dir;
	this.readonly = options.readonly;
}

fileSysAgent.formatPath = function(relPath){
	return path.join(this.dir, relPath);
}

fileSysAgent.readFileResponse = function(absolutePath, fn){
	magic.detectFile(absolutePath, function(err, result){
		if(err) return fn(err);
		var encoding = result.substr(result.indexOf("charset=") + "chartset=".length); 
		fs.readFile(absolutePath, encoding, function(err, data){
			if(err){
				var serverErr = {
					code: 500,
					message: err
				};
				return fn(serverErr);
			}

			var serverResponse = {
				code: 200,
				message: "OK",
				contentType: result,
				data: data
			};

			return fn(null, serverResponse);
		});
	});
}

fileSysAgent.exists = function(absolutePath, fn){
	fs.exists(absolutePath, function(exists){
		fn(exists ? true : false);
	});
}

fileSysAgent.read = function(relPath, req, fn){
	var self = this;
	var absolutePath = self.formatPath(relPath);
	self.exists(absolutePath, function(exists){
		if(exists){
			self.readFileResponse(absolutePath, fn);
		} else {
			var serverErr = {
				code: 404,
				message: "could not find file {0}".format(absolutePath);
			};

			return fn(serverErr);
		}
	});
}