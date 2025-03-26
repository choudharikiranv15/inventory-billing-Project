import express from 'express';
import { ProductController } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', 
  authMiddleware.verifyToken, 
  ProductController.create
);

router.get('/:id', 
  authMiddleware.verifyToken,
  ProductController.getById
);

router.patch('/:id/stock',
  authMiddleware.verifyToken,
  ProductController.updateStock
);

export const productRoutes = router;