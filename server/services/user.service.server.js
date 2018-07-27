module.exports = function (app) {

  var userModel = require("../test-mongodb/user/user.model.server");

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findUsers);
  app.post("/api/user", createUser);
  app.put("/api/user/:uid", updateUser);

  var users = [
    {_id:"5b5a3b18fc9f5c886b3d3077", username: "alice",   password: "alice",   firstName: "Alice",  lastName: "Wonder"},
    {_id:"234", username: "bob",     password: "bob",     firstName: "Bob",    lastName: "Marley"},
    {_id:"345", username: "charlie", password: "charlie", firstName: "Chrlie", lastName: "Garciar"},
    {_id:"456", username: "dan",     password: "dan",     firstName: "Dan",    lastName: "Brown"}
  ];

  function updateUser(req, res) {
    var newUser = req.body;
    var uid = req.params["uid"];
    userModel.updateUser(newUser, uid)
      .then(function(user) {
        res.json(user);
      });
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if(username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function (user) {
          res.json(user);
      });
      return;
      /*var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
      if(user){
        res.json(user);
      } else {
        res.json({});
      }
      return;*/
    } else if(username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          res.json(user);
        });
        return;
      /*var user = users.find(function (user) {
        return user.username === username;
      });
      if(user){
        res.json(user);
      } else {
        res.json({});
      }
      return;*/
    }
    res.json(users);
  }

  function findUserById(req, res) {
    var uid = req.params["uid"];
    userModel
      .findUserById(uid)
      .then(function (user) {
          res.json(user);
      });
    /*var user = users.find(function (user) {
      return user._id === uid;
    });
    res.json(user);*/
  }

};
