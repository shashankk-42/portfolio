// Vercel Serverless Function Handler
const app = require('../server/server');

// Export as Vercel serverless function
module.exports = (req, res) => {
    // Let Express handle the request
    return app(req, res);
};
