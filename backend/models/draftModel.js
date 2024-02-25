const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const draftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

const model = mongoose.model('Draft', draftSchema);

module.exports = model;