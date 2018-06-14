// Core
const mongoose = require('mongoose')
const Schema = require('../../models/users.js')
const validator = require('node-validator')

const check = validator.isObject()
.withRequired('ids', validator.isArray())

module.exports = class Search {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Data base connect
   */
  getModel (res) {
    mongoose.connect('mongodb://localhost:27017/api42')

    this.db = mongoose.connection
    this.db.on('error', () => {
      res.status(500).json({
        'code': 500,
        'message': 'Internal Server Error'
      })

      console.error(`[ERROR] user/create getModel() -> Connetion fail`)
    })

    const User = mongoose.model('User', Schema)


    return User
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/user/search', validator.express(check), (req, res) => {
      try {
        const result = {}
        const ids = req.body.ids
        
       let userIds = []
        let users = []

        console.log(ids)
        this.getModel(res).find({
          
                  '_id': {$in: ids}
               
        }).exec().then(data => {
          console.log(data)
          res.status(200).json({
            'data': data,
            'code': 200,
            'message': 'Good request'
          })
        })


        
      } catch (e) {
        console.error(`[ERROR] user/search -> ${e}`)
        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}
