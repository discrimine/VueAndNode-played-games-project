const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    genre: String,
    isCompleted: Boolean
})

module.exports = mongoose.model('Game', gameSchema);