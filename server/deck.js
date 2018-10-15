const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    name: String,
    cards: Array,
});