module.exports = function (app) {

  var userModel = require("../test-mongodb/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findUsers);
  app.post("/api/user", createUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/loggedIn", loggedIn);
  app.post("/api/register", register);
  app.post("/api/logout", logout);
  app.put("/api/user/:uid", updateUser);

  var users = [
    {_id:"5b5a3b18fc9f5c886b3d3077", username: "alice",   password: "alice",   firstName: "Alice",  lastName: "Wonder"},
    {_id:"234", username: "bob",     password: "bob",     firstName: "Bob",    lastName: "Marley"},
    {_id:"345", username: "charlie", password: "charlie", firstName: "Chrlie", lastName: "Garciar"},
    {_id:"456", username: "dan",     password: "dan",     firstName: "Dan",    lastName: "Brown"}
  ];

  function loggedIn(req, res){
    if(req.isAuthenticated()){
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function logout(req, res){
    req.logOut();
    res.send(200);
  }

  function localStrategy(usr, pass, done){
    userModel.findUserByCredentials(usr, pass)
      .then(function(user) {
        if(user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
  }

  function login(req, res){
    /*var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user) {
        req.login(user, function (err) {
          res.json(user);
        });
      });*/
      res.json(req.user);
  }

  function register(req, res){
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user) {
        req.login(user, function (err) {
          res.json(user);
        });
      });
  }

  function serializeUser(user, done){
    done(null, user);
  }

  function deserializeUser(user, done){
    userModel.findUserById(user._id)
      .then( function(user) {
        done(null, user);
      }, function(err){
        done(err, null);
      });
  }

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
