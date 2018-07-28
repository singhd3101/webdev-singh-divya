var WebsiteSchema = require("./website.schema.server");
var UserSchema = require("../../test-mongodb/user/user.schema.server");
var mongoose = require('mongoose');
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
var UserModel = require("../../test-mongodb/user/user.model.server");

WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWesbiteByUser = findWesbiteByUser;

module.exports = WebsiteModel;

function createWebsite(website){
  var newWebsite = null;
  return WebsiteModel
    .create(website)
    .then(function (website) {
      newWebsite = website;
      UserModel.findUserById(website.developerId)
        .then( function (user) {
          user.websites.push(newWebsite);
          return user.save(user);
        });
    })
}

function findWesbiteByUser(uid) {
  return WebsiteModel.find({developerId : uid});
}
