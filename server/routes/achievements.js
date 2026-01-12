const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const authMiddleware = require('../middleware/auth');

// Get all achievements (public)
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1, date: -1 });
        res.json({ success: true, achievements });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single achievement (public)
router.get('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json({ success: true, achievement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create achievement (admin only)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const achievement = new Achievement(req.body);
        await achievement.save();
        res.status(201).json({ success: true, achievement });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update achievement (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json({ success: true, achievement });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete achievement (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        res.json({ success: true, message: 'Achievement deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
