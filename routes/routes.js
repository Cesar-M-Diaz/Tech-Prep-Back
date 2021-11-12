const express = require('express');
const bb = require('express-busboy');
const Controller = require('../controllers/updateProfile.controller');
const registerController = require('../controllers/register.controller');
const User = require('../controllers/user.controller');
const loginController = require('../controllers/login.controller');
const questionController = require('../controllers/question.controller');
const sessionController = require('../controllers/session.controller');

const app = express.Router();

app.post('/register', registerController.createUser);
app.post('/login', loginController.login);
app.get('/login', User.getUserData);
app.patch('/update', Controller.updateProfile);
app.post('/question', questionController.createQuestion);
app.get('/question', questionController.getQuestions);
app.get('/questions/:id', questionController.getQuestionsByUser);
app.get('/question/:id', questionController.getQuestion);
app.put('/question/:id', questionController.updateQuestion);
app.delete('/question/:id', questionController.deleteQuestion);
app.post('/session', sessionController.createSession);
app.put('/session', sessionController.editSession);
app.get('/session/:id', sessionController.getSessionData);
app.get('/sessions/:id', sessionController.getCompletedSessions);

bb.extend(app, {
  upload: true,
  path: 'uploads',
  allowedPath: /./,
});

app.patch('/uploadProfileImage', Controller.updateProfileImage);

module.exports = app;
