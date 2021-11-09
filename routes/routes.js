const express = require('express');
const bb = require('express-busboy');
const Controller = require('../controllers/updateProfile.controller');
const registerController = require('../controllers/register.controller');
const User = require('../controllers/user.controller');
const loginController = require('../controllers/login.controller');

const app = express.Router();

app.post('/register', registerController.createUser);
app.post('/login', loginController.login);
app.get('/login', User.getUserData);
app.patch('/update', Controller.updateProfile);

bb.extend(app, {
  upload: true,
  path: 'uploads',
  allowedPath: /./,
});

app.patch('/uploadProfileImage', Controller.updateProfileImage);

module.exports = app;
