const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');
// require('dotenv').config({ path: '../.env' });

const createUser = async (req, res) => {
  try {
    const registerData = req.body;

    const user = await new User(registerData);
    await user.save();

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        userId: user._id,
        userData: user,
      },
      process.env.JWT_SECRET,
    );

    const userInfo = { token, userData: user };
    res.status(201).json(userInfo);

    // sendEmail({
    //   user: user,
    //   template: 'd-0bc86a7e18464b9191cb127be79f094c',
    //   template_data: { name: user.name },
    // });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createUser };
