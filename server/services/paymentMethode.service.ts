import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPayments = (userId: number) =>
  prisma.paymentMethod.findMany({ where: { userId } });

export const addPaymentMethod = (userId: number, data: any) =>
  prisma.paymentMethod.create({ data: { ...data, userId } });

export const updatePaymentMethod = (id: number, userId: number, data: any) =>
  prisma.paymentMethod.updateMany({ where: { id, userId }, data });

export const deletePaymentMethod = (id: number, userId: number) =>
  prisma.paymentMethod.deleteMany({ where: { id, userId } });
