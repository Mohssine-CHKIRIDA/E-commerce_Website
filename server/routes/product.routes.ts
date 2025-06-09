import express from 'express';
import * as productController from '../controllers/product.controller';
import { isAdmin } from '../middleware/auth.middleware';

const router = express.Router();
router.get('/search', productController.searchProducts);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', isAdmin, productController.create);


export default router;
