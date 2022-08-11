import express from 'express';
import cors from 'cors';
import http from 'http';
import './connexion.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';

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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/utilisateurs', userRoutes);
app.use('/articles', productRoutes);
app.use('/images', imageRoutes);
app.use('/commandes', orderRoutes);

app.post('/valider-paiement', async (req, res) => {
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

server.listen(8080, () => {
  console.log(`Le serveur est connecté au port ${process.env.PORT}`);
});
