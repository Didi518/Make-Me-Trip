import express from 'express';
import { getOrders, newOrder, validOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', newOrder);
router.get('/', getOrders);
router.patch('/:id/valide', validOrder)

export default router;
