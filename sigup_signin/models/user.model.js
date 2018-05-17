const mongoose = require('mongoose');

const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String, 
    required: true,
     unique: true
   },
    gender: {
      type: String,
       enum: ["Male", "Female"]
     },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  mobile: {
    type: Number, 
    required: true
  },
  password: {
  	type: String, 
  	required: true
  }
  

});

module.exports = mongoose.model('User', user);