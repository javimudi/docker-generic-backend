'use strict';

var debug = {
    warn: require('debug')('warn'),
    info: require('debug')('info'),
    error: require('debug')('error')
};


var models = require('./models'),
Tag = models.Tag,
Post = models.Post;

// Helper to simplify db results
function process_update(res, error, result){

    if(error){
        debug.error("Error 500: " + error);
        res.sendStatus(500);
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


var fetchall = function(req, res, next){
	// TODO: PAGINATOR META
	Post.find({}).populate('tags').exec(function(err, result){
		console.log(err, result);
		if(err){ res.sendStatus(204); }
		if(result==null){
            res.sendStatus(204);
        }
        else{
			res.json(result);
        }
	})
}

var fetchone = function(req, res, next){

	Post.findOne({'_id': req.params.id}).populate('tags').exec(function(err, result){
		if(err){ res.sendStatus(204); }
		else{
			if(result==null){
	            res.send(204).json({});
	        }
	        else{
				res.json(result);
	        }
		}

	});
}

var create = function(req, res){
	Post(req.body).save(function(err, result){
		if ('tags' in req.body){
			console.log(req.body.tags);
		}
		process_update(res, err, result);
	});
}

var update = function(req, res){
	Post.update({'_id': req.params.id}, req.body, {'upsert': true}, function(error, result){
		process_update(res, error, result);
	})
}

var drop = function(req, res){
	Post.delete({'_id': req.params.id}, function(err, result){
		if(err){ res.sendStatus(204)}
		else { res.sendStatus(200); }

	});
}


module.exports = {
	fetchall: fetchall,
	fetchone: fetchone,
	create: create,
	update: update,
	drop: drop
}

