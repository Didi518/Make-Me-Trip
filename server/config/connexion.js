import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connexionStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.agrds.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(connexionStr, { useNewUrlParser: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  console.log(err);
});
