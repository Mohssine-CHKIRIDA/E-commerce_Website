import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (userId: number, orderData: any) => {
  const { totalAmount, shippingAddress, orderItems, paymentIntent } = orderData;
  
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("orderItems must be a non-empty array");
  }
  
  return prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
          })),
        },
      },
    });
    
    if (paymentIntent) {
      await tx.paymentIntent.create({
        data: {
          stripeId: paymentIntent.stripeId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency || "eur",
          status: paymentIntent.status,
          clientSecret: paymentIntent.clientSecret,
          orderId: createdOrder.id,
        },
      });
    }
    
    return tx.order.findUnique({
      where: { id: createdOrder.id },
      include: { orderItems: true, paymentIntent: true },
    });
  });
};

export const getUserOrders = async (userId: number) => {
  if (!userId || isNaN(userId)) {
    throw new Error("Invalid userId provided");
  }
  
  return prisma.order.findMany({
    where: { userId },
    include: { orderItems: true, paymentIntent: true }
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: { orderItems: true, paymentIntent: true }
  });
};

export const getOrderById = async (orderId: number) => {
  console.log(`Service: Fetching order with ID: ${orderId}, type: ${typeof orderId}`); // Debug log
  
  if (!orderId || isNaN(orderId)) {
    throw new Error("Invalid orderId provided");
  }
  
  try {
    const result = await prisma.order.findUnique({
      where: { 
        id: orderId 
      },
      include: { 
        orderItems: true, 
        paymentIntent: true 
      }
    });
    
    console.log(`Service: Query result:`, result ? 'Found order' : 'No order found'); // Debug log
    return result;
  } catch (error) {
    console.error(`Service: Error in getOrderById:`, error);
    throw error;
  }
};
export const updateOrder = async (orderId: number, updateData: any) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    return null;
  }

  return prisma.order.update({
    where: { id: orderId },
    data: {
    status: updateData.status?.toUpperCase(), // ✅ to match enum
      shippingAddress: updateData.shippingAddress,
      totalAmount: updateData.totalAmount,
      // Tu peux ajouter d'autres champs à autoriser ici
    },
    include: {
      orderItems: true,
      paymentIntent: true,
    },
  });
};
export const deleteOrder = async (id: number) => {
  const existing = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
      paymentIntent: true,
    },
  });

  if (!existing) return false;

  // Supprimer d'abord les OrderItems
  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  // Supprimer ensuite le PaymentIntent (si existant)
  await prisma.paymentIntent.deleteMany({
    where: { orderId: id },
  });

  // Enfin, supprimer la commande
  await prisma.order.delete({
    where: { id },
  });

  return true;
};
