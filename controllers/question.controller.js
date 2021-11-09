// const User = require('../models/user.model');
const Question = require('../models/question.model');

const createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const question = await new Question(questionData);
    await question.save();

    res.status(201).json(question);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createQuestion };
