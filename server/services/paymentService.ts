import { PrismaClient } from '@prisma/client';
import stripe from '../config/stripe';

const prisma = new PrismaClient();

export class PaymentService {
    /**
     * Creates a payment intent for an order
     * @param orderId - The ID of the order to create a payment intent for
     * @returns The created payment intent
     */
    async createPaymentIntent(orderId: number) {
        try {
            // Get order details from database
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!order) {
                throw new Error('Order not found');
            }

            // Create a payment intent with the order amount
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.totalAmount * 100), // Convert to cents
                currency: 'usd',
                metadata: {
                    orderId: order.id.toString(),
                    userId: order.userId.toString()
                }
            });

            // Update order with payment intent ID
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentIntent: paymentIntent.id
                }
            });

            return paymentIntent;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    /**
     * Handles successful payment completion
     * @param paymentIntentId - The ID of the completed payment intent
     */
    async handlePaymentSuccess(paymentIntentId: string) {
        try {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            const orderId = Number(paymentIntent.metadata.orderId);

            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: 'PROCESSING',
                    paymentStatus: 'PAID'
                }
            });
        } catch (error) {
            console.error('Error handling payment success:', error);
            throw error;
        }
    }

    /**
     * Processes a refund for an order
     * @param orderId - The ID of the order to refund
     * @returns The created refund
     */
    async createRefund(orderId: number) {
        try {
            const order = await prisma.order.findUnique({
                where: { id: orderId }
            });

            if (!order || !order.paymentIntent) {
                throw new Error('Order not found or no payment intent associated');
            }

            const refund = await stripe.refunds.create({
                payment_intent: order.paymentIntent
            });

            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: 'REFUNDED'
                }
            });

            return refund;
        } catch (error) {
            console.error('Error creating refund:', error);
            throw error;
        }
    }

    /**
     * Gets order with payment information
     */
    async getOrderWithPayment(orderId: number) {
        try {
            const order = await prisma.order.findUnique({
                where: { id: orderId }
            });

            if (!order) {
                return null;
            }

            if (order.paymentIntent) {
                // Get payment intent details from Stripe
                const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntent);
                return {
                    ...order,
                    stripePaymentDetails: paymentIntent
                };
            }

            return order;
        } catch (error) {
            console.error('Error getting order payment details:', error);
            throw error;
        }
    }
} 