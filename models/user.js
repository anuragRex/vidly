const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const User = mongoose.model('users', new mongoose.Schema({
   name : {
       type : String,
       required : true,
       minlength : 3,
       maxlength : 50
   },
   email : {
      type : String,
      required : true,
      minlength : 3,
      maxlength: 255,
      //unique : true
   },
   password : {
      type : String,
      minlength : 3,
      maxlength: 1024,
      required : true
   }
}));

function validateUser(user){
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        email : Joi.string().min(5).max(255).email().required(),
        password : Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;