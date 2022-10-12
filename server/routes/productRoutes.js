import express from 'express';
import {
  addToCart,
  decreaseCart,
  deleteProduct,
  findProduct,
  getProducts,
  increaseCart,
  newProduct,
  productsByCategory,
  removeFromCart,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post(
  '/', newProduct
);
router.patch(
  '/:id', updateProduct
);
router.delete('/:id', deleteProduct);
router.get('/:id', findProduct);
router.get('/categorie/:category', productsByCategory);
router.post('/ajouter-reservations', addToCart);
router.post('/augmenter-reservations', increaseCart);
router.post('/diminuer-reservations', decreaseCart);
router.post('/supprimer-reservations', removeFromCart);

export default router;
