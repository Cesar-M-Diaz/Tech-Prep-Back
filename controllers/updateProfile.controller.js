const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, description, schedule, price } = req.body.inputs;
    const { url, token } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).send('Email is already taken');
      next();
    } else {
      const { userData } = jwt.verify(token, process.env.JWT_SECRET);
      const newPassword = password && (await bcrypt.hash(password, 10));
      await User.updateOne(
        { _id: userData._id },
        {
          name: name || userData.name,
          email: email || userData.email,
          password: newPassword || userData.password,
          profile_photo: url || userData.profile_photo,
        },
      );
      const newUserData = await User.findOne({ _id: userData._id });
      const newToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
          userId: newUserData._id,
          type,
          userData: newUserData,
        },
        process.env.JWT_SECRET,
      );
      res.json(newToken);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    cloudinary.uploader.upload(req.files.image.file, (error, result) => {
      if (error) {
        return next();
      }
      const url = result.url;
      res.status(200).send(url);
    });
  } catch (error) {
    res.status(200).send(null);
  }
};

module.exports = { updateProfile, updateProfileImage };
