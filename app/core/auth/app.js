'use strict';

var User = require('./models').User;


var postUser = function(req, res, next) {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'New beer drinker added to the locker room!' });
    });
  };

var getUsers = function(req, res, next) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  };


// Export the Mongoose model
module.exports = {
  postUser: postUser,
  getUsers: getUsers
}