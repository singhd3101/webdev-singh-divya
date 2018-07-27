module.exports = function(app) {

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/cs5610', {
    useMongoClient: true
  });
};
