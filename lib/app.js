"use strict";
require('./util/string');
var options = require('./util/args')(process.argv.slice(2));


console.log("starting instant-server on {0}:{1} for directory {2}".format(options.host || "0.0.0.0", options.port, options.dir));

var fsAgent = require('./filesys/fileSysAgent')(options);
var app = require('./server/server')(options, fsAgent);
