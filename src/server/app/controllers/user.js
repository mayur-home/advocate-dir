var User = require('../models/user');

module.exports = {
    // get: get,
    findByEmail: findByEmail,
    findById: findbyId,
    create: create,
    delete: deleteById,
    validatePassword: validatePassword
};

////////////////

function create(body, callback) {
    var user = new User({
        firstName: body.firstname,
        lastName: body.lastName,
        age: body.age,
        location: body.location,
        email: body.email,
        password: body.password
    });

    //Saving the model instance to the DB
    user.save(function(err, result) {
        if (err) throw err;
        callback({
            messaage: 'Successfully created a new user',
            user: result
        });
    });
}

function findByEmail(email, callback) {
    User.findOne({
        email: email
    }, function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

function findbyId(_id, callback) {
    User.findById(_id, function(err, user) {
        if (err) throw err;
        callback(user);
    });
}

function deleteById(params, callback) {
    User.findOneAndRemove({
        id: params.id
    }, function(err, result) {
        if (err) throw err;
        callback({
            message: "Successfully deleted the User",
            user: result
        });
    });
}

function validatePassword(email, password, callback) {
    findByEmail(email, function(user) {
        callback(user.password === password);
    });
}
