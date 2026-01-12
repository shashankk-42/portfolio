const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    achievements: [{
        type: String
    }],
    current: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
