import express from 'express';
import { addSale, getSales } from '../controllers/salesController.js';

const router = express.Router();

router.post('/', addSale);
router.get('/', getSales);

export default router;
