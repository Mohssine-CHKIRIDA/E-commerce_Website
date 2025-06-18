import { Request, Response } from 'express';
import * as service from '../services/paymentMethode.service';

export const getPayments = async (req: Request & { user?: any }, res: Response) => {
  const payments = await service.getPayments(req.user.id);
  res.json(payments);
};

export const createPayment = async (req: Request & { user?: any }, res: Response) => {
  const payment = await service.addPaymentMethod(req.user.id, req.body);
  res.status(201).json(payment);
};

export const updatePayment = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  await service.updatePaymentMethod(Number(id), req.user.id, req.body);
  res.json({ message: 'Payment method updated' });
};

export const deletePayment = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  await service.deletePaymentMethod(Number(id), req.user.id);
  res.json({ message: 'Payment method deleted' });
};
