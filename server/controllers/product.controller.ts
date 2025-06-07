import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await productService.getProductById(id);
  if (!product) {
     res.status(404).json({ message: 'Product not found' });
  }
   res.json(product);
};
