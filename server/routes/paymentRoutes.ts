import express, { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { stripeWebhookMiddleware } from '../middleware/stripeWebhook';

const router: Router = express.Router();
const paymentController = new PaymentController();

// Handle regular payment endpoints with JSON parsing
router.use(express.json());
router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    stripeWebhookMiddleware
);

router.use(express.json()); // le reste peut utiliser json normalement.

router.post('/create-intent/:orderId', paymentController.createPaymentIntent);
router.post('/refund/:orderId', paymentController.createRefund);
router.get('/status/:orderId', paymentController.getPaymentStatus);


export const paymentRoutes = router; 