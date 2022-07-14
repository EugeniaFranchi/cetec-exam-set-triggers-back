var mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  course: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  start: {
    type: Date,
    required: true
  },
  finish: {
    type: Date,
    required: true
  },
  startMinutesMargin: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  },
  finishMinutesMargin: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  }
});

const exam = mongoose.model("exam", examSchema);

module.exports = exam;
