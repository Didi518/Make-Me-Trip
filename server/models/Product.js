import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'ne peut pas rester vide'],
    },
    description: {
      type: String,
      required: [true, 'ne peut pas rester vide'],
    },
    price: {
      type: String,
      required: [true, 'ne peut pas rester vide'],
    },
    category: {
      type: String,
      required: [true, 'ne peut pas rester vide'],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
