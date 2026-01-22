require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const projectsRouter = require('./routes/projects');
const achievementsRouter = require('./routes/achievements');
const experiencesRouter = require('./routes/experiences');
const aboutRouter = require('./routes/about');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/about', aboutRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Handle React routing - use middleware instead of wildcard route
    // This catches all requests not handled by above routes
    app.use((req, res, next) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server only in development (Vercel handles this in production)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on port ${PORT}`);
        console.log(`📡 API available at http://localhost:${PORT}/api`);
        console.log(`💚 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
}

// Export for serverless (Vercel)
module.exports = app;
