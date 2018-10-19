const mongoose = require('mongoose');

/*
    Deck: Name, Icon, Practice Record, Review Properties
    Card: Front, Back, Q&A
    Front, Back: Content, Answer
*/

const DeckSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exrpots = mongoose.model('Deck', DeckSchema);
