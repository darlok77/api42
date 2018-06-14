const Schema = require('mongoose').Schema;

module.exports = new Schema ({
  id: Number,
  name: String,
  age: Number,
  gender: String
}, {
  collection: 'users',
  versionKey: false
})