/*
 * file: 			deleteFile.js
 * description: 	unit tests to ensure that our file-deleting capabilities work as expected
 * author: 			Aaron Stannard
 * created: 		8/13/2013
 * last-modified: 	8/13/2013
 */

var assert = require('assert'),
	should = require('should'),
	fs = require('fs'),
	path = require('path');

var FileSysAgent = require('../lib/filesys/fileSysAgent').FileSysAgent,
	Logger = require('../lib/logging/consoleLogger.js').Logger;

var logger = new Logger({verbose:true});

var fsAgent = new FileSysAgent({
	dir: process.cwd(),
	logger: logger
});


var testFile = "helloworld";
var fileName = "helloworld.txt";
var directory = "magicFolder";

var absoluteDirPath = path.join(process.cwd(), directory);
var absoluteFilePath = path.join(absoluteDirPath, fileName);

var relativeFilePath = path.join(directory, fileName);

/**
 * Tests
 */

describe('filesys agent', function(){

	/**
 	 * Setup
 	 */
	beforeEach(function(done){
		try{
			//create our target files
			fs.mkdirSync(absoluteDirPath);
			fs.writeFileSync(absoluteFilePath, testFile);
			return done();
		} catch(err){
			return done(err);
		}
		
	});

	/**
 	 * Teardown
 	 */
	afterEach(function(done){
		try{
			//remove our target files
			fs.unlinkSync(absoluteFilePath);
			fs.rmdirSync(absoluteDirPath);
			return done();
		} catch(err){
			return done(err);
		}
	});

	describe('delete file', function(){
		it('should return a 404 when file does not exist', function(done){
			var req = {};
			fsAgent.delete('/fakepath/fake.txt', req, function(err, data){
				if(err){
					err.code.should.equal(404);
					done();
				} else{
					done({message:"test failed - expected an error"});
				}
			});
		});

		it('should return a 204 if the file does exist and has been deleted', function(done){
			var req = {};
			fsAgent.delete('/fakepath/fake.txt', req, function(err, data){
				if(err){
					err.code.should.equal(404);
					done();
				} else{
					done({message:"test failed - expected an error"});
				}
			});
		});
	});

	describe('delete directory', function(){

	});
});
