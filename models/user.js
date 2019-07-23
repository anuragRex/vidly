const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    },
    isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id : this._id, isAdmin : this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
} 

const User = mongoose.model('users', userSchema);

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