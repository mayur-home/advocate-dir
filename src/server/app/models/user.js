var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  // creating index on field id
  id: {type: Number, index: true},
  firstName: String,
  lastName: String,
  age: String,
  location: String,
  email: String,
  password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;