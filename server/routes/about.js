const express = require('express');
const router = express.Router();
const About = require('../models/About');
const authMiddleware = require('../middleware/auth');

// Get about info (public)
router.get('/', async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            // Create default about if doesn't exist
            about = new About({});
            await about.save();
        }
        res.json({ success: true, about });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update about info (admin only)
router.put('/', authMiddleware, async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = new About(req.body);
        } else {
            Object.assign(about, req.body);
            about.updatedAt = Date.now();
        }
        await about.save();
        res.json({ success: true, about });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
