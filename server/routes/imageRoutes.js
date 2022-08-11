import express from 'express';
import { deleteImage } from '../controllers/imagesController.js';

const router = express.Router();

router.delete('/:public_id', deleteImage);

export default router;
