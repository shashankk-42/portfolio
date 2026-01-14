const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ''
  },
  images: [{
    type: String // URLs to images
  }],
  techStack: [{
    type: String
  }],
  domain: {
    type: String,
    default: ''
  },
  features: [{
    type: String
  }],
  architecture: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  demo: {
    type: String,
    default: ''
  },
  semester: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  isIndustry: {
    type: Boolean,
    default: false
  },
  organization: {
    type: String,
    default: ''
  },
  organizationUrl: {
    type: String,
    default: ''
  },
  ongoing: {
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

module.exports = mongoose.model('Project', projectSchema);
