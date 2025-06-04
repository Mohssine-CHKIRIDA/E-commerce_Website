import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import Stripe from 'stripe';
import stripe from '../config/stripe';

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    /**
     * Creates a payment intent for an order
     */
    createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderId = Number(req.params.orderId);
            
            if (isNaN(orderId)) {
                res.status(400).json({ error: 'Invalid order ID' });
                return;
            }

            const paymentIntent = await this.paymentService.createPaymentIntent(orderId);
            
            res.json({
                clientSecret: paymentIntent.client_secret,
                orderId: orderId
            });
        } catch (error) {
            console.error('Payment intent creation failed:', error);
            if (error instanceof Stripe.errors.StripeError) {
                res.status(402).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to create payment intent' });
            }
        }
    };

    /**
     * Handles Stripe webhook events
     */
    handleWebhook = async (req: Request, res: Response) => {
        try {
            const event = req.body;

            // Handle the event
            switch (event.type) {
                case 'payment_intent.succeeded':
                    await this.paymentService.handlePaymentSuccess(event.data.object.id);
                    break;
                // Add other event types as needed
            }

            res.json({ received: true });
        } catch (error) {
            console.error('Webhook handling failed:', error);
            res.status(500).json({ error: 'Webhook handling failed' });
        }
    };

    /**
     * Creates a refund for an order
     */
    createRefund = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderId = Number(req.params.orderId);
            
            if (isNaN(orderId)) {
                res.status(400).json({ error: 'Invalid order ID' });
                return;
            }

            const { reason } = req.body;
            const refund = await this.paymentService.createRefund(orderId);
            
            res.json({
                refundId: refund.id,
                status: refund.status,
                amount: refund.amount
            });
        } catch (error) {
            console.error('Refund creation failed:', error);
            if (error instanceof Stripe.errors.StripeError) {
                res.status(402).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to create refund' });
            }
        }
    };

    /**
     * Gets payment status for an order
     */
    getPaymentStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderId = Number(req.params.orderId);
            
            if (isNaN(orderId)) {
                res.status(400).json({ error: 'Invalid order ID' });
                return;
            }

            const order = await this.paymentService.getOrderWithPayment(orderId);
            
            if (!order) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            res.json({
                orderId: order.id,
                status: order.paymentStatus,
                paymentIntentId: order.paymentIntent,
                amount: order.totalAmount
            });
        } catch (error) {
            console.error('Failed to get payment status:', error);
            if (error instanceof Stripe.errors.StripeError) {
                res.status(402).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to get payment status' });
            }
        }
    };
} 