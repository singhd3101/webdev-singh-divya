module.exports = function (app) {

  var websiteModel = require("../test-mongodb/website/website.model.server");

  var WEBSITES = require("./website.mock");

  app.get("/api/user/:uid/website", findWebsiteForUser);
  app.post("/api/user/:uid/website", createWebsite);
  app.delete("/api/user/:uid/website/:wid", deleteWebsite);
  app.get("/api/user/:uid/website/:wid", findWebsiteById);
  app.put("/api/user/:uid/website/:wid", updateWebsite);

  /*var WEBSITES = [
    {_id:"123", name: "Facebook", description: "... 123", devloperId: "123"},
    {_id:"234", name: "Twitter", description: "... 234", devloperId: "123"},
    {_id:"345", name: "Wikipedia", description: "... 345", devloperId: "234"},
    {_id:"456", name: "Amazon", description: "... 456", devloperId: "234"}
  ];*/

  function updateWebsite(req, res){
    var wid = req.params['wid'];
    var uid = req.params['uid'];
    var website = req.body;
    for(var i=0; i<WEBSITES.length; i++){
      if(WEBSITES[i]._id === wid){
        WEBSITES[i] = website;
        var websites = getWebsiteForUserId(uid);
        res.json(websites);
        return;
      }
    }
  }

  function findWebsiteById(req, res){
    var wid = req.params['wid'];
    var uid = req.params['uid'];
    for(var i=0; i<WEBSITES.length; i++){
      if(WEBSITES[i]._id === wid){
        res.json(WEBSITES[i]);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    var wid = req.params['wid'];
    var uid = req.params['uid'];
    for(var i=0; i<WEBSITES.length; i++){
      if(WEBSITES[i]._id === wid){
        WEBSITES.splice(i, 1);
        var websites = getWebsiteForUserId(uid);
        res.json(websites);
        return;
      }
    }
  }

  function createWebsite(req, res){
    var uid = req.params['uid'];
    var website = req.body;
    /*website._id = (new Date()).getTime() + "";
    WEBSITES.push(website);
    var websites = getWebsiteForUserId(uid);
    res.json(websites);*/
    website.developerId = uid;
    websiteModel
      .createWebsite(website)
      .then(function (website) {
        websiteModel.findWesbiteByUser(uid)
          .then(function (websites) {
            res.json(websites);
          });
      }, function(err){
        console.log(err);
      });
  }

  function findAllWebsites(req, res) {
    console.log("in server website service");
    res.json(WEBSITES);
  }

  function findWebsiteForUser(req, res) {
    var uid = req.params['uid'];
    /*var websites = getWebsiteForUserId(uid);
    res.json(websites);*/
    websiteModel.findWesbiteByUser(uid)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function getWebsiteForUserId(uid){
    var websites = [];
    for(var i=0; i<WEBSITES.length; i++){
      if(WEBSITES[i].devloperId === uid){
        websites.push(WEBSITES[i]);
      }
    }
    return websites;
  }

};
