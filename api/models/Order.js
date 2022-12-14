import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Object,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
      default: 'en cours',
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
    fullName: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} n'est pas un e-mail valide`,
      },
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
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
  { minimize: false, timestamps: true }
);

OrderSchema.pre('remove', function (next) {
  this.model('User').remove({ orders: this._id }, next());
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
