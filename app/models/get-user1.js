var mongoose = require('mongoose');
// Create schema
var UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});
module.exports = mongoose.model('User',UserSchema);
