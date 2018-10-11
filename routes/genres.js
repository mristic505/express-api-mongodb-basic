const Joi = require('joi');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET ======================================
router.get('/', async (req, res) => {
  let genres = await Genre.find()
  res.send(genres);
});

// POST =====================================
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({    
    name: req.body.name
  });
  genre = await genre.save();

  res.send(genre);
});

// PUT ======================================
router.put('/:id', async (req, res) => {

  // Validate provided value with JOI
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  // If document not found in DB
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// DELETE ===================================
router.delete('/:id', async (req, res) => {
  // Validate provided value with JOI
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let genre = await Genre.findByIdAndRemove(req.params.id);
  // If document not found in DB
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// GET SINGLE ENTRY ==============================
router.get('/:id', async (req, res) => {
  // Validate ID format and length
  idFormatNotValid(req.params.id) && res.status(404).send('Invalid ID format');
  // Look for document in DB
  const genre = await Genre.findById(req.params.id);
  // Send response
  genre? res.send(genre) : res.status(404).send('The genre with the given ID was not found.');
});

const idFormatNotValid = (id) => {
    // Validate ID format and length
    return !mongoose.Types.ObjectId.isValid(id);
}


module.exports = router;