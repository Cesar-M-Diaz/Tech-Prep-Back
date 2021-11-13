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

const updateQuestion = async (req, res) => {
  try {
    const data = req.body;

    const question = await Question.find({ _id: req.params.id });

    const updatedQuestion = await Question.updateOne(
      { _id: req.params.id },
      {
        question: data.question || question.question,
        answer: data.answer || question.answer,
        option_1: data.option_1 || question.option_1,
        option_2: data.option_2 || question.option_2,
        option_3: data.option_3 || question.option_3,
        title: data.title || question.title,
        explanation: data.explanation || question.explanation,
        technology: data.technology || question.technology,
        level: data.level || question.level,
      },
    );

    res.status(201).json(updatedQuestion);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const response = await Question.deleteOne({ _id: req.params.id });
    console.log(response);

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });
    res.status(201).json(question);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getQuestionsByUser = async (req, res) => {
  try {
    const questions = await Question.find({ user_id: req.params.id }).sort({ createdAt: -1 });
    res.status(201).json(questions);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getQuestions = async (req, res) => {
  try {
    // get the last questions added
    const questions = await Question.find().sort({ createdAt: -1 });

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

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByUser,
};
