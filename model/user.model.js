const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  questionPaperIds:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questionPapers' 
    }
  ],
  answerSheetIds:[{
    type : Schema.Types.ObjectId,
    ref : "answerSheet"
  }],
  userType:{
    type: String,
    required: true,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  authorized:{
    type: Boolean,
    default: false,
  }
});
module.exports = mongoose.model("users", User);