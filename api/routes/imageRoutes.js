import express from 'express';
import imagesController from '../controllers/imagesController.js';

const router = express.Router();

router.route('/:public_id').delete(imagesController.deleteImage);

export default router;
