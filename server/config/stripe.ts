import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if STRIPE_SECRET_KEY is defined
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil', // Latest Stripe API version
    typescript: true, // Enable TypeScript support
});

export default stripe; 