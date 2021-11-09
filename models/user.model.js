const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, 'Email is required'],
      validate: {
        validator: async function (value) {
          const user = await User.findOne({ email: value });
          if (user) return false;
        },

        message: 'Duplicated Email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    profile_photo: String,
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    return result === true ? user : null;
  }

  return null;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
