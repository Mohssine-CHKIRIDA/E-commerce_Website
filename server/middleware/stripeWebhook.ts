import { Request, Response } from 'express';
import stripe from '../config/stripe';
import { PaymentService } from '../services/paymentService';
import Stripe from 'stripe';

const paymentService = new PaymentService();

// Only handle these events - explicit type safety
type StripeWebhookEvents = 
    | 'payment_intent.succeeded'
    | 'payment_intent.payment_failed'
    | 'charge.refunded'
    | 'checkout.session.completed';

export const stripeWebhookMiddleware = async (req: Request, res: Response): Promise<void> => {
    let event: Stripe.Event;

    try {
        const signature = req.headers['stripe-signature'];

        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            res.status(500).json({ error: 'Missing Stripe webhook secret' });
            return;
        }

        if (!signature) {
            res.status(400).json({ error: 'Missing stripe-signature header' });
            return;
        }

        try {
            // Verify the event
            event = stripe.webhooks.constructEvent(
                req.body, // Express.raw() middleware ensures this is raw body
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error('⚠️ Webhook signature verification failed');
            res.status(400).json({ error: 'Invalid webhook signature' });
            return;
        }

        // Type guard for event type
        if (!isValidEventType(event.type)) {
            console.log(`Skipping unhandled event type: ${event.type}`);
            res.json({ received: true, handled: false });
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await paymentService.handlePaymentSuccess(paymentIntent.id);
                console.log('✅ Payment succeeded:', paymentIntent.id);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                // Add your payment failure handling logic here
                console.log('❌ Payment failed:', paymentIntent.id);
                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge;
                // Add your refund handling logic here
                console.log('💰 Refund processed:', charge.id);
                break;
            }

            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                // Add your checkout completion logic here
                console.log('🛍️ Checkout completed:', session.id);
                break;
            }
        }

        // Send successful response
        res.json({ received: true, type: event.type });

    } catch (error) {
        console.error('⚠️ Webhook processing error:', error);
        res.status(500).json({ 
            error: 'Webhook processing failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Type guard function
function isValidEventType(type: string): type is StripeWebhookEvents {
    const validTypes: StripeWebhookEvents[] = [
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'charge.refunded',
        'checkout.session.completed'
    ];
    return validTypes.includes(type as StripeWebhookEvents);
}