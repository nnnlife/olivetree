const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    deck: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    front: {
        content: {
            type: Buffer
        },
        answer: {
            type: Array
        }
    },
    back: {
        content: {
            type: Buffer
        },
        answer: {
            type: Array
        }
    }
});

module.exports = mongoose.model('Card', CardSchema);