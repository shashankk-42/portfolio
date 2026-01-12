const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['publication', 'patent', 'award', 'certification'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
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

module.exports = mongoose.model('Achievement', achievementSchema);
