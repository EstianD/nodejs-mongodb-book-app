const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: 'Please fill in this field'
        },
        author: {
            type: String,
            required: 'Please fill in this field'
        },
        genre: {
            type: String,
            required: 'Please fill in this field'
        },
        rating: {
            type: String
        }
    }
);

module.exports = mongoose.model('Book', bookSchema);