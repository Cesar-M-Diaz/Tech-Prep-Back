const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question_number: { type: Number, required: true },
    technology: { type: String, required: true },
    level: { type: String, required: true },
    correct_answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Question',
    },
    wrong_answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Question',
    },
    status: {
      type: String,
      default: 'incomplete',
    },
  },
  {
    timestamps: true,
  },
);

const Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;
