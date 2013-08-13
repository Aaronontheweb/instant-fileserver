/*
 * file: 			args.js
 * description: 	used to process command-line arguments for instant-server
 * author: 			Aaron Stannard
 * created: 		8/12/2013
 * last-modified: 	8/12/2013
 */

"use strict";
var ArgumentParser = require("argparse").ArgumentParser;
var parser = new ArgumentParser({
	version: "0.1.0",
	addHelp: true,
	description: 'instant-server'
});

parser.addArgument(
	['-d','--dir'],
	{
		help: 'the root directory for the server to service its requests',
		nargs: 1,
		required: false,
		defaultValue: process.cwd()
	}
);

parser.addArgument(
	['-r','--readonly'],
	{
		help: 'run the server in read-only mode',
		nargs: 0,
		required: false,
		defaultValue:false
	}
);

parser.addArgument(
	['-p','--port'],
	{
		help: 'specify which port to use for handling incoming requests',
		nargs: 1,
		required: false,
		defaultValue: process.env.PORT || 1337
	}
);
var parse = module.exports = function parse(args){ return parser.parseArgs(args); }