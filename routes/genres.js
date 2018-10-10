const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Create Schema for a collection
const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
});

// Create Class based on the schema
const Genre = mongoose.model('Genre', genreSchema, 'genres');

// GET ======================================
router.get('/', async (req, res) => {
  let genres = await Genre.find()
  res.send(genres);
});

// POST =====================================
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
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
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  !mongoose.Types.ObjectId.isValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  // If document not found in DB
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// DELETE ===================================
router.delete('/:id', async (req, res) => {
  // Validate provided value with JOI
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // Validate ID format and length
  !mongoose.Types.ObjectId.isValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let genre = await Genre.findByIdAndRemove(req.params.id);
  // If document not found in DB
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// GET SINGLE ENTRY ==============================
router.get('/:id', async (req, res) => {
  
  // Validate ID format and length
  !mongoose.Types.ObjectId.isValid(req.params.id) && res.status(404).send('Invalid ID format');

  // Look for document in DB and update if found
  let genre = await Genre.findById(req.params.id);
  // If document not found in DB
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// VALIDATE WITH Joi FUNCTION
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;