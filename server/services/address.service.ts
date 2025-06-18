import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserAddresses = async (userId: number) => {
  return prisma.address.findMany({ where: { userId } });
};

export const addAddress = async (userId: number, data: any) => {
  return prisma.address.create({
    data: { ...data, userId },
  });
};

export const updateAddress = async (id: number, userId: number, data: any) => {
  return prisma.address.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteAddress = async (id: number, userId: number) => {
  return prisma.address.deleteMany({
    where: { id, userId },
  });
};
