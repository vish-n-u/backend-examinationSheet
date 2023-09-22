const mongoose = require("mongoose")
const Schema = mongoose.Schema
const QuestionPaper = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    default:"new Question Paper"
  },
  examDate:{
    type: Schema.Types.Date,
    required: true,
  },
    questionPaper :{
        type : Array,
        required : true
    },
    teacherId :{
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref:"users"
    },
    studentIds: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User' 
        },
       
      ]

    
})


module.exports = new mongoose.model("questionPapers",QuestionPaper,)