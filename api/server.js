import express from 'express';
import cors from 'cors';
import http from 'http';
import './config/connexion.js';
import corsOptions from './config/corsOptions.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { body } from 'express-validator';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-08-01',
});
const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.NODE_ENV);

app.use(
  '/api/utilisateurs',
  [
    body('name').trim().escape(),
    body('email').trim().escape(),
    body('password').trim().escape(),
  ],
  userRoutes
);
app.use(
  '/api/articles',
  [
    body('name').trim().escape(),
    body('price').trim().escape(),
    body('category').trim().escape(),
  ],
  productRoutes
);
app.use('/api/images', imageRoutes);
app.use(
  '/api/commandes',
  [
    body('fullName').trim().escape(),
    body('mail').trim().escape(),
    body('address').trim().escape(),
    body('zipcode').trim().escape(),
    body('city').trim().escape(),
    body('country').trim().escape(),
  ],
  orderRoutes
);

app.post('/api/valider-paiement', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card'],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est connecté au port ${process.env.PORT}`);
});
