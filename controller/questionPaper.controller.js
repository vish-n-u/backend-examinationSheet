const QuestionPaper = require("../model/questionPaper.model")
const User = require("../model/user.model")
 
exports.createQp = async(req,res)=>{
    console.log(req.body,"ework.createQp")
    try{
        const qpObject = {
            teacherId:req.user._id,
            questionPaper : req.body.questionPaper,
            name : req.body.name,
            examDate : req.body.examDate,
        }
        const newQpaper = await QuestionPaper.create(qpObject)
        req.user.questionPaperIds.push(newQpaper._id)
        await req.user.save()
        return res.status(201).send({message:newQpaper})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }

}

exports.getQuestionPapersByTeacherId = async(req,res)=>{
    try{
        let questionPapersOfTeacher = await req.user.populate("questionPaperIds")
        return res.status(200).send({message:questionPapersOfTeacher})

    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})

    }
} 

exports.assignQpToStudents = async(req,res)=>{
    console.log("req.students:",req.students,"req.body.studentIds",req.body.studentIds)
    try{
       // Update questionPaperIds for each student in req.students
await Promise.all(req.students.map(async student => {
    let newQpIds = student.questionPaperIds;
    newQpIds.push(req.body.questionPaperId);
    student.questionPaperIds = newQpIds;
    await student.save();
  }));
  
  // Concatenate studentIds without extra square brackets
  let studentIds = req.questionPaper.studentIds;
  let newStudentIds = [...studentIds, ...req.body.studentIds];
  
        req.questionPaper.studentIds = newStudentIds
       await req.questionPaper.save()
        console.log("req.questionPaper",req.questionPaper)
        return res.status(200).send({message:"success"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}


exports.getAllQuestionPaperOfStudent= async(req,res)=>{
    try {
        // Assuming you have a Mongoose User model with 'questionPaperIds' and 'answerSheetIds' fields
        const userWithPopulatedFields = await User.findById(req.user._id)
          .populate('questionPaperIds')
          .populate({
            path: 'answerSheetIds',
            populate: { path: 'studentId' }})
          .exec();
      
        // Access the user object with populated fields
        const allQuestionPaper = userWithPopulatedFields.questionPaperIds;
        const allAnswerSheets = userWithPopulatedFields.answerSheetIds;
      
        // Now, 'allQuestionPaper' and 'allAnswerSheets' contain the populated data
        console.log('Populated questionPaperIds:', allQuestionPaper);
        console.log('Populated answerSheetIds:', allAnswerSheets);
        res.status(200).send({message:userWithPopulatedFields})
      } catch (error) {
        console.error(error);
        return res.status(500).send({message:"Internal Server Error"})

      }
    }
      
      
      