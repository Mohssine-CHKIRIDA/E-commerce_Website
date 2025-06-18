import { Request, Response } from 'express';
import * as addressService from '../services/address.service';

export const getAddresses = async (req: Request & { user?: any }, res: Response) => {
  const addresses = await addressService.getUserAddresses(req.user.id);
  res.json(addresses);
};

export const createAddress = async (req: Request & { user?: any }, res: Response) => {
  const address = await addressService.addAddress(req.user.id, req.body);
  res.status(201).json(address);
};

export const updateAddress = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  await addressService.updateAddress(Number(id), req.user.id, req.body);
  res.json({ message: 'Address updated' });
};

export const deleteAddress = async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.params;
  await addressService.deleteAddress(Number(id), req.user.id);
  res.json({ message: 'Address deleted' });
};
