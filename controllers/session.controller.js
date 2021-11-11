const Session = require('../models/session.model');
const Question = require('../models/question.model');

const createSession = async (req, res) => {
  try {
    const sessionData = req.body;

    const session = await new Session(sessionData);
    await session.save();

    const questions = await Question.aggregate([
      { $match: { technology: sessionData.technology, level: sessionData.level } },
    ]).sample(Number(sessionData.question_number));

    res.status(201).json({ questions, session });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const editSession = async (req, res) => {
  try {
    const data = req.body;

    const correct = Object.keys(data.answers).filter((key) => data.answers[key] === 'correct');
    const wrong = Object.keys(data.answers).filter((key) => data.answers[key] === 'wrong');

    const updatedSessionData = await Session.updateOne(
      { _id: data.id },
      {
        correct_answers: [...correct],
        wrong_answers: [...wrong],
        status: 'finished',
      },
    );

    const updatedSession = await Session.findOne({ _id: data.id });

    res.status(200).json({ updatedSession, updatedSessionData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const getSessionData = async (req, res) => {
  try {
    const session = await Session.findById({ _id: req.params.id });

    const wrong_questions = await Question.find({
      _id: { $in: [...session.wrong_answers] },
    });

    res.status(200).json({ session, wrong_questions });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const getCompletedSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.params.id, status: 'finished' }).sort({
      createdAt: -1,
    });

    res.status(200).json({ sessions });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

module.exports = { createSession, editSession, getSessionData, getCompletedSessions };
