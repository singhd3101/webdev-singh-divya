var WebsiteSchema = require("./website.schema.server");
var mongoose = require('mongoose');
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWesbiteByUser = findWesbiteByUser;

module.exports = WebsiteModel;

function createWebsite(website){
  return WebsiteModel.create(website);
}

function findWesbiteByUser(uid) {
  return WebsiteModel.find({developerId : uid});
}
