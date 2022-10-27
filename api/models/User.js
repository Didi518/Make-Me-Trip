import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'est requis'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'est requis'],
      unique: true,
      index: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} n'est pas un e-mail valide`,
      },
    },
    password: {
      type: String,
      required: [true, 'est requis'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  {
    minimize: false,
    timestamps: true,
  }
);

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Identifiants invalides');
  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (isSamePassword) return user;
  throw new Error('Identifiants invalides');
};

// je fais disparaitre le mot de passe avant de manipuler l'object user en json, lors des requêtes front/back
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// avant d'enregistrer un user en bdd, je hashe le mot de passe
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre('remove', function (next) {
  this.model('Order').remove({ owner: this._id }, next());
});

const User = mongoose.model('User', UserSchema);

export default User;
