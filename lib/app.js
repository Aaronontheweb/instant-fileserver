"use strict";

var http = require("http");

require('./util/string');
var options = require('./util/args')(process.argv.slice(2));


console.log("starting instant-server on port {0} for directory {1}".format(options.port, options.dir));