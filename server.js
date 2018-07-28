// Get the dependencies

const express      = require('express');
const path         = require('path');
const http         = require('http');
const bodyParser   = require('body-parser');
const app          = express();
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const passport     =  require('passport');

app.use(cookieParser());
//app.use(session({secret : process.env.SESSION_SECRET}));
app.use(session({secret : "fgsdjfsdjsdh"}));

//set up passport after cookie parser and session
app.use(passport.initialize());
app.use(passport.session());

//install load configure bodyparser tools
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //changed after including passport
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  //added after passport
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

require("./server/app")(app);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen( port , () => console.log('Running'));
