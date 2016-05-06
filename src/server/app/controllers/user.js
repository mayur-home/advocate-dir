var User = require('../models/user');

module.exports = {
    create: create
};

////////////////

function create(req, res) {
    User.create(req.body, function(err, user){
        if (err) {
          res.json(500, err);
        }
        res.json(user);
    });
}
