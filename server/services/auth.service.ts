import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const validateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};
export const loginUser = async (email: string, password: string) => {
  const user = await validateUser(email, password);
  if (!user) return null;

  const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });

  return { accessToken, refreshToken };
};
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error('EMAIL_EXISTS');

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
    },
  });

  const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });

  return { accessToken, refreshToken };
};
export const getUserProfile = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      birthdate: true,
      gender: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
export const refreshAccessToken = (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
    id: number;
    email: string;
    role: string;
  };

  return generateAccessToken(decoded);
};
export const updateUserProfile = async (
  userId: number,
  data: {
    name?: string;
    phone?: string;
    birthdate?: string;
    gender?: string;
  }
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      phone: data.phone,
      birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
      gender: data.gender,
    },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      birthdate: true,
      gender: true,
      role: true,
      createdAt: true,
    },
  });
};
