const mongoose = require('mongoose') //REQUIRES MONGOOSE LIBRARY

const userSchema = new mongoose.Schema({ //USER SCHEMA
  email: {
    type: String,
    required: true
  }, // unique
  password: {
    type: String,
    required: true
  }, // hashed
  role: {
    type:String
  }, // 'admin' or 'user'
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
})

module.exports = mongoose.model('User', userSchema) //EXPORTS 'userSchema' AS 'User' 