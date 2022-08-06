import express from 'express';
import cors from 'cors';
import http from 'http';
import './connexion.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/utilisateurs', userRoutes);
app.use('/articles', productRoutes);
app.use('/images', imageRoutes);

server.listen(8080, () => {
  console.log(`Le serveur est connecté au port ${process.env.PORT}`);
});
