var UserSchema = require("./user.schema.server");
var mongoose = require('mongoose');
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.findUserById = findUserById;
UserModel.findAllUsers = findAllUsers;
UserModel.createUser = createUser;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.updateUser = updateUser;

module.exports = UserModel;

function updateUser(user, uid) {
  return UserModel.update({_id : uid}, user);
}

function findUserByUsername(username) {
  return UserModel.findOne({username : username});
}

function findUserByCredentials(username, password){
  return UserModel.findOne({username : username, password : password});
}

function createUser(user){
  return UserModel.create(user);
  /*UserModel.create(user, function(err, doc){
    console.log(err);
    console.log(doc);
  });*/
}

function findAllUsers(){
  UserModel.find(user, function(err, docs){
    console.log(docs);
  });
}

function findUserById(userId){
  return UserModel.findById(userId);
  /*UserModel.findById(userId, function(err, docs){
    console.log(doc);
  });*/
}
