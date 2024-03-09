const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema( {
    _id: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    genre: { type: Array, required: true},
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Movie', movieSchema);