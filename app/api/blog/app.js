'use strict';

var debug = {
    warn: require('debug')('warn'),
    info: require('debug')('info'),
    error: require('debug')('error')
};


var models = require('./models'),
Post = models.Post;

// Helper to simplify db results
function process_update(res, error, result, a){

    if(error){
        debug.error("Error 400: " + error);
        res.sendStatus(400);
    }
    else if (!result.upserted){
        res.sendStatus(200);
    }
    else if(result.upserted){
        res.sendStatus(201);                
    }
    else {
        res.sendStatus(202);
    }
}


function process_find(res, err, result, default_value){
	if(err){ res.sendStatus(204); }
	else if(result==null){
        res.json(default_value);
    }
    else{
		res.json(result);
    }	
}


var fetchall = function(req, res, next){
	// TODO: PAGINATOR WITH META
	Post.find({}, function(err, result){
		process_find(res, err, result, []);
	});
}

var fetchone = function(req, res, next){
	Post.findOne({'_id': req.params.id}, function(err, result){
		process_find(res, err, result, {});
	});
}

var create = function(req, res){
	Post(req.body).save(function(err, result){
		process_update(res, err, result);
	});
}

var update = function(req, res){
	Post.update({'_id': req.params.id}, req.body, function(error, result){
		process_update(res, error, result);
	})
}

var drop = function(req, res){
	Post.remove({'_id': req.params.id}, function(err, result){
		if(err){ res.sendStatus(204)}
		else{
			if(result.result.n==0){
				res.sendStatus(404);
			}
			else if(result.result.n==1){
				res.sendStatus(200);
			}
			else {
				res.sendStatus(204);
			}
		}

	});
}


module.exports = {
	fetchall: fetchall,
	fetchone: fetchone,
	create: create,
	update: update,
	drop: drop
}

