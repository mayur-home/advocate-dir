var LocalStrategy = require('passport-local').Strategy;
var userController = require('./app/controllers/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(_id, done) {
    userController.findById(_id, function(user) {
      done(user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    userController.findByEmail(email, findByEmailCallback);

    function findByEmailCallback(user) {
      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {
        var body = {
          email: email,
          password: password,
          firstName: 'Mayur',
          lastName: 'Patel'
        };
        userController.create(body, function(response) {
          return done(null, response.user);
        });
      }
    }

  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) { // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    userController.findByEmail(email, findByEmailCallback);

    function findByEmailCallback(user) {
      console.log('1');
      // if no user is found, return the message
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
        // req.flash is the way to set flashdata using connect-flash
      }

      console.log('2');
      userController.validatePassword(email, password, function(isValid) {
        if (!isValid) {
          // if the user is found but the password is wrong
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        // all is well, return successful user
        console.log('3');
        return done(null, user);
      });
    }

  }));
};
