const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Customer = mongoose.model('customers', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    isGold : {
        type : Boolean,
        default : true
    },
    phone : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 20
    }
}));


function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        isGold : Joi.boolean(),
        phone : Joi.string().min(5).max(20).required()
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;