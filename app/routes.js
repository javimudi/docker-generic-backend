'use strict';

var express = require('express'),
router = express.Router();

var debug = {
	warn: require('debug')('warn'),
	info: require('debug')('info'),
	error: require('debug')('error')
}

var walk = require('walk'),
fs = require('fs'),
ospath = require('path'),
basepath = "./api/",
walker;

var apiDir = ospath.join(ospath.dirname(module.filename), basepath);

module.exports = function(){

	walker = walk.walk(apiDir, {followLinks: false});
	walker.on("directories", function(root, dsArray, next){
		dsArray.forEach(function(dir){
			var routing = ospath.join(apiDir, dir.name, 'routes.js');
			try {
				fs.statSync(routing);
				debug.info("Found routes for " + dir.name + " api");
				router.use('/' + dir.name, require(routing));
			}
			catch(e){
				debug.error(e);
			}
		})

		next();
	});

	walker.on('end', function(){
		walker.emit('newroute', router);
	})
	return walker;

};