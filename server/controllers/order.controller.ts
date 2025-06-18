import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const placeOrder = async (req: Request & { user?: any }, res: Response) => {
   if (!req.user) {
     res.status(401).json({ error: "Utilisateur non authentifié" });
    return;
  }
  const order = await orderService.createOrder(req.user.id, req.body);
  res.status(201).json(order);
};

export const getUserOrders = async (req: Request & { user?: any }, res: Response) => {
  const orders = await orderService.getUserOrders(req.user.id);
  res.json(orders);
};
export const getOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
     res.status(400).json({ error: "Invalid order ID" });
     return;
  }

  try {
    const order = await orderService.getOrderById(id);

    if (!order) {
       res.status(404).json({ error: "Order not found" });
       return ;
    }

    res.json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};
export const updateOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
     res.status(400).json({ error: "Invalid order ID" });
     return;
  }

  try {
    const updatedOrder = await orderService.updateOrder(id, req.body);

    if (!updatedOrder) {
       res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteOrderController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
     res.status(400).json({ error: "Invalid order ID" });
     return;
  }

  try {
    const deleted = await orderService.deleteOrder(id);
    if (!deleted) {
       res.status(404).json({ error: "Order not found" });
       return;
    }
     res.json({ message: "Order deleted successfully" });
     return;
  } catch (error) {
    console.error("Error deleting order:", error);
     res.status(500).json({ error: "Internal server error" });
  }
};