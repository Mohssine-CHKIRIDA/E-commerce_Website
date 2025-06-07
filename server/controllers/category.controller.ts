import { Request, Response } from "express";
import * as service from "../services/category.service";

// === CATEGORY ===
export const getAllCategories = async (_req: Request, res: Response) => {
  const data = await service.getAllCategories();
  res.json(data);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await service.getCategoryById(id);
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, imageUrl } = req.body;
  const newCategory = await service.createCategory({ name, imageUrl });
  res.status(201).json(newCategory);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await service.updateCategory(id, req.body);
  res.json(updated);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.deleteCategory(id);
  res.sendStatus(204);
};

// === SUBCATEGORY ===
export const getAllSubcategories = async (_req: Request, res: Response) => {
  const data = await service.getAllSubcategories();
  res.json(data);
};

// === BRAND ===
export const createBrand = async (req: Request, res: Response) => res.status(201).json(await service.createBrand(req.body));
export const updateBrand = async (req: Request, res: Response) => res.json(await service.updateBrand(Number(req.params.id), req.body));
export const deleteBrand = async (req: Request, res: Response) => { await service.deleteBrand(Number(req.params.id)); res.sendStatus(204); };
export const getAllBrands = async (_req: Request, res: Response) => {
  const data = await service.getAllBrands();
  res.json(data);
};