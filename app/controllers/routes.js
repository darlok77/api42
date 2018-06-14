const Create = require('./user/create.js')
const Show = require('./user/show.js')
const Search = require('./user/search.js')
const Update = require('./user/update.js')
const Destroy = require('./user/destroy.js')

module.exports = {
  user: {
    Create,
    Show,
    Search,
    Update,
    Destroy
  }
}
