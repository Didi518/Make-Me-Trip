import Order from '../models/Order.js';
import User from '../models/User.js';

export const newOrder = async (req, res) => {
  const {
    userId,
    cart,
    fullName,
    mail,
    address,
    zipCode,
    city,
    country,
    dates,
  } = req.body;
  try {
    const user = await User.findById(userId);
    console.log(dates);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      fullName,
      mail,
      address,
      zipCode,
      city,
      country,
      dates,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    user.markModified('orders');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('owner', ['mail', 'fullName']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

// commandes validées
export const validOrder = async (req, res) => {
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: 'validée' });
    const orders = await Order.find().populate('owner', ['mail', 'fullName']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
