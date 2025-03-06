import express from 'express';

// Const
const app = express();
const { NODE_ENV, PORT } = process.env;


// Middelwares


// Routing
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello API' });
});


// Launching
app.listen(PORT, () => {
    console.log(`Web API is running on port ${PORT} (${NODE_ENV})`);
});