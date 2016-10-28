'use strict';

var env = require('process').env;

// Settings

var port = env.PORT || 17000,
environ = env.ENVIRON || 'test',
pguser = env.PGUSER || 'test',
pgpass = env.PGPASS || 'test',
pghost = env.PGHOST || "127.0.0.1",
pgport = env.PGPORT || 5432,
pgstring = `postgres:\/\/${pguser}:${pgpass}@${pghost}:${pgport}\/backend${environ}`,
apiversion = 'v1';

module.exports = {
	port: port,
	environ: environ,
	pgstring: pgstring,
	apiversion: apiversion
}