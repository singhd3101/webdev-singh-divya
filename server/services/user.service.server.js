module.exports = function (app) {
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:uid", findUserById);
  app.get("/api/user", findUsers);

  var users = [
    {_id:"123", username: "alice",   password: "alice",   firstName: "Alice",  lastName: "Wonder"},
    {_id:"234", username: "bob",     password: "bob",     firstName: "Bob",    lastName: "Marley"},
    {_id:"345", username: "charlie", password: "charlie", firstName: "Chrlie", lastName: "Garciar"},
    {_id:"456", username: "dan",     password: "dan",     firstName: "Dan",    lastName: "Brown"}
  ];

  function helloUser(req, res) {
    res.send("Hello from user service");
  }

  function findUsers(req, res) {
    console.log("in find all");
    var username = req.query["username"];
    var password = req.query["password"];
    if(username && password) {
      var user = users.find(function (user) {
        return user.username === username && password === password;
      });
      if(user){
        res.json(user);
      } else {
        res.json({});
      }
      return;
    } else if(username) {
      var user = users.find(function (user) {
        return user.username === username;
      });
      if(user){
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }
    res.json(users);
  }

  function findUserById(req, res) {
    var uid = req.params["uid"];
    var user = users.find(function (user) {
      return user._id === uid;
    });
    res.json(user);
  }

};
