import express from 'express';
import * as controller from '../controllers/paymentMethode.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/',authMiddleware, controller.getPayments);
router.post('/',authMiddleware, controller.createPayment);
router.put('/:id',authMiddleware, controller.updatePayment);
router.delete('/:id',authMiddleware, controller.deletePayment);

export default router;
