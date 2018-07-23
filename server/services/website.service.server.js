module.exports = function (app) {

  //var WEBSITESS = require("../../src/app/models/website.mock");

  app.get("/api/user/:uid/website", findWebsiteForUser);

  var WEBSITES = [
    {_id:"123", name: "Facebook", description: "... 123", devloperId: "123"},
    {_id:"234", name: "Twitter", description: "... 234", devloperId: "123"},
    {_id:"345", name: "Wikipedia", description: "... 345", devloperId: "234"},
    {_id:"456", name: "Amazon", description: "... 456", devloperId: "234"}
  ];

  function findAllWebsites(req, res) {
    console.log("in server website service");
    res.json(WEBSITES);
  }

  function findWebsiteForUser(req, res) {
    var uid = req.params['uid'];
    var websites = [];
    for(var i=0; i<WEBSITES.length; i++){
      if(WEBSITES[i].devloperId === uid){
        websites.push(WEBSITES[i]);
      }
    }
    res.json(websites);
  }

};
