import express, { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { stripeWebhookMiddleware } from '../middleware/stripeWebhook';

const router: Router = express.Router();
const paymentController = new PaymentController();

// Handle regular payment endpoints with JSON parsing
router.use(express.json());

// Create payment intent for an order
router.post('/create-intent/:orderId', paymentController.createPaymentIntent);

// Webhook endpoint - must be before JSON middleware and use raw body parser
router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    stripeWebhookMiddleware
);

// Process refund
router.post('/refund/:orderId', paymentController.createRefund);

// Get payment status
router.get('/status/:orderId', paymentController.getPaymentStatus);

export const paymentRoutes = router; 