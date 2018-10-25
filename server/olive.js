const mongoose = require('mongoose');

const OliveSchema = new mongoose.Schema({
    branch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Branch',
        required: true,
    },
    keyword: {
        type: String
    },
    content: {
        type: Array,
    },
    shared: {
        type: Array
    }
});

module.exports = mongoose.model('Olive', OliveSchema);