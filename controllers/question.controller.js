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

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    // populate each question with the user who created it
    const populatedQuestions = await Promise.all(
      questions.map(async (question) => {
        const populatedQuestion = await Question.findById(question._id)
          .populate('user_id', 'name')
          .exec();
        return populatedQuestion;
      }),
    );

    res.status(200).json(populatedQuestions);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createQuestion, getQuestions };
