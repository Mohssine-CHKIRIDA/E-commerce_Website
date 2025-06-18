import express from 'express';
import * as orderController from '../controllers/order.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
router.get('/all',orderController.getAllOrders)
router.post('/',authMiddleware, orderController.placeOrder);
router.get('/',  orderController.getUserOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder); // autorise la mise à jour complète
router.delete("/:id", orderController.deleteOrderController);

export default router;
