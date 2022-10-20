import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// inscription

router.route('/inscription').post(userController.signup);

// connexion

router.route('/connexion').post(userController.signin);

// récupérer liste des clients

router.route('/').get(userController.getUsers);

// récupérer les commandes des clients

router.route('/:id/commandes').get(userController.userOrders);

export default router;
