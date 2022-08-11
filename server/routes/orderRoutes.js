import express from 'express';
import { getOrders, newOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', newOrder);
router.get('/', getOrders);

export default router;
