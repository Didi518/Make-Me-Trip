import express from 'express';
import {
  deleteProduct,
  editProduct,
  findProduct,
  getProducts,
  newProduct,
  productsByCategory,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', newProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', findProduct);
router.get('/categorie/:category', productsByCategory);

export default router;
