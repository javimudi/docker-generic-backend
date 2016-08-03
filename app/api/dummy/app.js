'use strict';


// Dummy getter
var getter = function(req, res){
	res.sendStatus(200);
}



module.exports = {
	get: getter
}