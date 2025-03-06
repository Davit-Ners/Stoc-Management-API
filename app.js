import express from 'express';
import morgan from 'morgan';
import { db } from './models/index.js';

// Const
const app = express();
const { NODE_ENV, PORT } = process.env;


// Middelwares
app.use(morgan('tiny'));
app.use(express.json());

await db.connectDB();

// Routing
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello API' });
});


// Launching
app.listen(PORT, () => {
    console.log(`Web API is running on port ${PORT} (${NODE_ENV})`);
});