import express from 'express';
import { getUsers, signin, signup } from '../controllers/userController.js';

const router = express.Router();

// inscription

router.post('/inscription', signup);

// connexion

router.post('/connexion', signin);

// récupérer liste des clients

router.get('/', getUsers);

export default router;
