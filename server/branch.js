const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    shared: {
        type: Array
    }
});

module.exports = mongoose.model('Branch', BranchSchema);
