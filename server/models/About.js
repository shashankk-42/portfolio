const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Shashank Kakad'
    },
    title: {
        type: String,
        required: true,
        default: 'Sophomore at VIT | SDE | Cybersecurity Enthusiast'
    },
    bio: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: 'shashankkakad10@gmail.com'
    },
    github: {
        type: String,
        default: 'https://github.com/shashankk-42'
    },
    linkedin: {
        type: String,
        default: 'https://www.linkedin.com/in/shashank-kakad/'
    },
    skills: [{
        type: String
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('About', aboutSchema);
