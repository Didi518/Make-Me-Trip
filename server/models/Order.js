import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Object,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: 'en cours',
    },
    total: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    fullName: {
      type: String,
    },
    mail: {
      type: String,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} n'est pas un e-mail valide`,
      },
    },
    address: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    dates: [
      {
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
      },
    ],
  },
  { minimize: false }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
