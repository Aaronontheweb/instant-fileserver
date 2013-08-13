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

FileSysAgent = function (options){
	this.dir = options.dir;
	this.readonly = options.readonly;
	this.logger = options.logger;
}

FileSysAgent.prototype.formatPath = function(relPath){
	var absPath = path.join(this.dir, relPath);
	console.log('requesting absolute path {0}'.format(absPath));
	return absPath;
}

FileSysAgent.prototype.readFileResponse = function(absolutePath, fn){
	var self = this;
	self.logger.verbose('determining MIME type for {0}'.format(absolutePath));
	magic.detectFile(absolutePath, function(err, result){
		if(err){
			self.logger.verbose('Exception! unable to determine MIME type for {0}'.format(absolutePath));
			return fn(err);
		} 
		var encoding = result.substr(result.indexOf("charset=") + "chartset=".length); 
		fs.readFile(absolutePath, function(err, data){
			if(err){
				var serverErr = {
					code: 500,
					message: err
				};
				self.logger.verbose('Exception! Unable to open {0} for reads'.format(absolutePath));
				return fn(serverErr);
			}

			self.logger.verbose('Opened {0} for reads successfully'.format(absolutePath));
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

FileSysAgent.prototype.exists = function(absolutePath, fn){
	fs.exists(absolutePath, function(exists){
		fn(exists);
	});
}

FileSysAgent.prototype.read = function(relPath, req, fn){
	var self = this;
	var absolutePath = self.formatPath(relPath);
	self.logger.verbose('receiving file read request for {0}'.format(absolutePath));

	self.exists(absolutePath, function(exists){
		if(exists == true){
			self.logger.verbose('file {0} found on disk'.format(absolutePath));
			self.readFileResponse(absolutePath, fn);
		} else {
			self.logger.verbose('file {0} not found on disk. HTTP: 404'.format(absolutePath));
			var serverErr = {
				code: 404,
				message: "could not find file {0}".format(absolutePath)
			};

			return fn(serverErr);
		}
	});
}

console.log(FileSysAgent);
module.exports.FileSysAgent = FileSysAgent;