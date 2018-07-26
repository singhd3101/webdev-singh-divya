module.exports = function (app) {

  var WEBSITES = require("./website.mock");

  app.get("/api/user/:uid/website", findWebsiteForUser);
  app.post("/api/user/:uid/website", createWebsite);
  app.delete("/api/user/:uid/website/:wid", deleteWebsite);

  /*var WEBSITES = [
    {_id:"123", name: "Facebook", description: "... 123", devloperId: "123"},
    {_id:"234", name: "Twitter", description: "... 234", devloperId: "123"},
    {_id:"345", name: "Wikipedia", description: "... 345", devloperId: "234"},
    {_id:"456", name: "Amazon", description: "... 456", devloperId: "234"}
  ];*/

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
    website._id = (new Date()).getTime() + "";
    WEBSITES.push(website);
    var websites = getWebsiteForUserId(uid);
    res.json(websites);
  }

  function findAllWebsites(req, res) {
    console.log("in server website service");
    res.json(WEBSITES);
  }

  function findWebsiteForUser(req, res) {
    var uid = req.params['uid'];
    var websites = getWebsiteForUserId(uid);
    res.json(websites);
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
