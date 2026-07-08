import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import donationRoute from './routes/donation.route.js';
import volunteerRoute from './routes/volunteer.route.js';

dotenv.config();

mongoose.connect(process.env.URL).then(
    () => {
        console.log('Mongodb connected');
    }
).catch((err) => {
    console.log(err);
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Health check endpoint for Render
app.get('/healthz', (req, res) => res.status(200).send('OK'));

app.use('/api/auth', authRoute);
app.use('/api/donate', donationRoute);
app.use('/api/volunteer', volunteerRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal error';
    res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        });
});