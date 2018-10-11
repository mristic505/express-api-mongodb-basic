const Joi = require('joi');
const mongoose = require('mongoose');

// Create Schema for a collection
const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
});

// Create Class based on the schema
const Genre = mongoose.model('Genre', genreSchema, 'genres');

// VALIDATE WITH Joi FUNCTION
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
};

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;