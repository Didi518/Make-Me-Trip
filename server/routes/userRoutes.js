import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  signin,
  signup,
  userOrders,
} from '../controllers/userController.js';

const router = express.Router();

// inscription

router.post('/inscription', [body('username').trim().escape()], signup);

// connexion

router.post('/connexion', signin);

// récupérer liste des clients

router.get('/', getUsers);

// récupérer les commandes des clients

router.get('/:id/commandes', userOrders);

export default router;
