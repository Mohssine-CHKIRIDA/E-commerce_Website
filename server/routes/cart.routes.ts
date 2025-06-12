import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', cartController.getCart);
router.post('/', cartController.addItemToCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.removeCartItem);
router.delete('/', cartController.clearUserCart);

export default router;
