const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const getUserData = async (req, res) => {
  try {
    const token = req.query.token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { getUserData };
