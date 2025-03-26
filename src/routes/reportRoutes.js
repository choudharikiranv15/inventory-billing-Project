import express from 'express';
import { getSalesReport } from '../controllers/reportController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sales', verifyToken, getSalesReport);

export default router;