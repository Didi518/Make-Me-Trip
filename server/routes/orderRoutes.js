import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(orderController.newOrder).get(orderController.getOrders);

router.route('/:id/valide', orderController.validOrder);

export default router;
