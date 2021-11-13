const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userAuth = await User.authenticate(email, password);
    if (userAuth) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
          userId: userAuth._id,
          userData: userAuth,
        },
        process.env.JWT_SECRET,
      );
      const user = { token, userData: userAuth };
      res.json(user);
    }
    next();
  } catch (error) {
    res.status(404).send('Not found');
    next(error);
  }
};

module.exports = { login };
