const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET ======================================
router.get('/', async (req, res) => {
  let customers = await Customer.find()
  res.send(customers);
});

// POST =====================================
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({    
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

// PUT ======================================
router.put('/:id', async (req, res) => {

  // Validate provided value with JOI
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  // If document not found in DB
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

// DELETE ===================================
router.delete('/:id', async (req, res) => {
  // Validate provided value with JOI
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let customer = await Customer.findByIdAndRemove(req.params.id);
  // If document not found in DB
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

// GET SINGLE ENTRY ==============================
router.get('/:id', async (req, res) => {
  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');
  // Look for document in DB
  const customer = await Customer.findById(req.params.id);
  // Send response
  customer? res.send(customer) : res.status(404).send('The customer with the given ID was not found.');
});

const idFormatNotValid = (id) => {
    // Validate ID format and length
    return !mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;