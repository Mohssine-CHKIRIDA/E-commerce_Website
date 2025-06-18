import { Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const getCustomersController = async (_req: Request, res: Response) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
