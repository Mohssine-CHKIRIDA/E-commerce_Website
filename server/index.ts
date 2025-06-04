import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { paymentRoutes } from './routes/paymentRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 