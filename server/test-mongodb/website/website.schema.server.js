var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
  name: String,
  developerId: String,
  description: String,
  visitCount: Number
}, {collection: 'website'});

module.exports = WebsiteSchema;
