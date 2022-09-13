import User from '../models/User.js';
import Order from '../models/Order.js';

// inscription

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send('E-mail déjà enregistré');
    res.status(400).send(e.message);
  }
};

// connexion

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// récupérer liste des clients

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// récupérer les commandes users

export const userOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('orders');
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
