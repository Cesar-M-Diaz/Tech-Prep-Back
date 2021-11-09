const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userAuth = await User.authenticate(email, password);
    let user = null;
    if (userAuth) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
          userId: userAuth._id,
          userData: userAuth,
        },
        process.env.JWT_SECRET,
      );
      user = { token, userData: userAuth };
    } else {
      res.status(404).send('Not found');
      return;
    }
    res.json(user);
    next();
  } catch (error) {
    res.status(500).send('server error');
    next(error);
  }
};

module.exports = { login };
