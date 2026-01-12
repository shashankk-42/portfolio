const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const authMiddleware = require('../middleware/auth');

// Get all experiences (public)
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, experiences });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create experience (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).json({ success: true, experience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update experience (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.json({ success: true, experience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete experience (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.json({ success: true, message: 'Experience deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
