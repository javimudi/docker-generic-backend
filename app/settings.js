var env = require('process').env;

// Settings

var port = env.PORT || 3000,
environ = env.ENVIRON || 'TEST',
mongohost = env.MONGOHOST || "127.0.0.1",
mongoport = env.MONGOPORT || 27017,
mongodbstring = "mongodb://" + mongohost + ":" + mongoport + "/nodebackend" + environ,
apiversion = 'v1';

module.exports = {
	port: port,
	environ: environ,
	mongodbstring: mongodbstring,
	apiversion: apiversion
}