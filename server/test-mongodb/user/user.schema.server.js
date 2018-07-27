var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  passowrd: String,
  firstName: String,
  lastName: String,
  dob: Date,
  salary: Number
}, {collection: 'user'});

module.exports = UserSchema;
