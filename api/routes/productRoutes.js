import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.newProduct);

router
  .route('/:id')
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct)
  .get(productController.findProduct);

router.route('/:categorie/:category').get(productController.productsByCategory);

router.route('/ajouter-reservations').post(productController.addToCart);

router.route('/augmenter-reservations').post(productController.increaseCart);

router.route('/diminuer-reservations').post(productController.decreaseCart);

router.route('/supprimer-reservations').post(productController.removeFromCart);

export default router;
