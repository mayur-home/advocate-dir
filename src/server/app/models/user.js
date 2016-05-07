var mongoose = require('mongoose');
var base64 = require('base-64');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  // creating index on field id
  id: {type: Number, index: true},
  firstName: String,
  lastName: String,
  age: String,
  location: String,
  email: String,
  hashedPassword: String
});

/**
 * Virtuals
 */
userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Methods
 */
userSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   */

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Encrypt password
   */

  encryptPassword: function(password) {
    return base64.encode(password);
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
