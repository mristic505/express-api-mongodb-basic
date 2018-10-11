const Joi = require('joi');
const mongoose = require('mongoose');

// Create Schema for a collection
const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    isGold: Boolean,
    phone: String
});

// Create Class based on the schema
const Customer = mongoose.model('Customer', customerSchema, 'customers');

// VALIDATE WITH Joi FUNCTION
function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean(),
      phone: Joi.string().min(5).max(50).required(),
    };
  
    return Joi.validate(customer, schema);
  }

exports.Customer = Customer;
exports.validate = validateCustomer;