var restful = require('node-restful');
var mongoose = restful.mongoose;

var objectSchema = new mongoose.Schema({
  title: String,
  creator: String,
  museum_number: String,
  object_type: String,
  place: String,
  location: String,
  date_text: String,
  museum_collection: String,
  description_text: String
});

module.exports = restful.model('Objects', objectSchema);
