const mongoose = require("mongoose")
const Schema = mongoose.Schema
const AnswerSheet = new mongoose.Schema({
    questionPaperId :{
        type : Schema.ObjectId,
        required : true,
        ref:"questionPapers"
    },
    studentId :{
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref:"users"
    },
    answers:{
        type:Array,
        required:true,
    }

    
})


module.exports = new mongoose.model("answerSheet",AnswerSheet)