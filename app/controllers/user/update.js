// Dependencies
const mongoose = require('mongoose')
const Schema = require('../../models/users.js')
const validator = require('node-validator')

const check = validator.isObject()
.withRequired('name', validator.isString())
.withOptional('age', validator.isNumber())
.withOptional('gender', validator.isString({ regex: /^male|femal$/ }))

module.exports = class Update {
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
    this.app.put('/user/update/:id', validator.express(check), (req, res) => {
      try {

        // Save
        this.getModel(res).findOneAndUpdate({id: req.params.id}, {$set:{name:req.body.name,age:req.body.age,gender:req.body.gender}},(err, result)=>{
          if (err) {
            res.status(500).json({
              'code': 500,
              'message': 'Internal Server Error'
            })
          
            this.db.close()
            console.error(`[ERROR] user/create middleware() -> ${err}`)
          }
            const update = {
              '_id': result._id,
              "id" : result.id,
             'name': req.body.name,
             'age': req.body.age,
             'gender': req.body.gender
           };

          res.status(200).json(update)
        })
      } catch (e) {
        console.error(`[ERROR] user/create -> ${e}`)
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
