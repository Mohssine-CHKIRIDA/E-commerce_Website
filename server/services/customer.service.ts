import { Order, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCustomers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    include: {
      orders: true,
    },
  });

  return users.map((user:any) => {
    const totalOrders = user.orders.length;
    const totalSpent = user.orders.reduce((sum:number, order:Order) => sum + order.totalAmount, 0);
    const lastOrder = user.orders.reduce((latest:any, order:Order) => {
      return order.createdAt > latest ? order.createdAt : latest;
    }, new Date(0));

    return {
      id: `CUST-${user.id.toString().padStart(3, "0")}`,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      joinDate: user.createdAt.toISOString().split("T")[0],
      totalOrders,
      totalSpent,
      status: "active", // À adapter si tu veux suivre les statuts clients
      lastOrder: lastOrder.toISOString().split("T")[0],
    };
  });
};
