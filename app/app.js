'use strict';

var express = require('express'),
env = require('process').env,
bodyparser = require('body-parser'),
mongoose = require('mongoose'),
settings = require('./settings'),
discover = require('./routes'),
passport = require('passport'),
Strategy = require('passport-http').DigestStrategy,
findByUsername = require('./api/blog/auth');


passport.use(new Strategy({ qop: 'auth' },
  function(username, cb) {
    findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user, user.password);
    })
  }));



var debug = {
	warn: require('debug')('warn'),
	info: require('debug')('info'),
	error: require('debug')('error')
}

var server = express(),
router = express.Router();

var passport = require('passport'),
authRoutes = require('./core/auth/routes');

var restServer = function(callback){

	// Basic setup
	server.use(bodyparser.urlencoded({ extended: true }));
	server.use(bodyparser.json());
	server.use(passport.initialize());


	// MongoDB connection
	mongoose.connect(settings.mongodbstring)
	mongoose.connection.on('connected', function(){
		debug.info("Connected to DB " + settings.mongodbstring);


		// Core/Auth
		debug.info("Appending auth routes");
		server.use('/api/', authRoutes);

		// Routes
		discover().on('newroute', function(routes){
			debug.info("Appending routes");
			server.use('/api/'+settings.apiversion, routes);
		});

		// Actual server start
		server.listen(settings.port, function(){
			debug.info("Service started at " + settings.port);

			if(typeof(callback) == typeof(Function)){
				callback();
			}
		});

	});

}

module.exports = {
	restServer : restServer,
	server: server
}
if(require.main === module){
    restServer();
}