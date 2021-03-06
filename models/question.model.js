const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    option_1: { type: String, required: true },
    option_2: { type: String, required: true },
    option_3: { type: String, required: true },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    technology: { type: String, required: true },
    level: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
