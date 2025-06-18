import express from 'express';
import * as controller from '../controllers/address.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', authMiddleware,controller.getAddresses);
router.post('/', authMiddleware,controller.createAddress);
router.put('/:id',authMiddleware, controller.updateAddress);
router.delete('/:id',authMiddleware, controller.deleteAddress);

export default router;
