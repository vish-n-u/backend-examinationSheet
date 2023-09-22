const QuestionPaper = require("../model/questionPaper.model")
const User = require("../model/user.model")

exports.isTeacher = (req,res,next)=>{
    if(req.user.userType === 'teacher'&&req.user.authorized){
    
    next()}
    else{
        return res.status(400).send({message:"Unauthorized"})
    }
}

exports.validateAssignQpToStudents = async(req,res,next)=>{
    if(!req.body.questionPaperId) return res.status(400).send({message:"No question paperId provided"})
    if(!req.body.studentIds||req.body.studentIds.length==0)  return res.status(400).send({message:"No question studentIds provided"})

    let questionPaper = await this.validateQpIdAndReturQp(req.body.questionPaperId)
    if(!questionPaper)return res.status(400).send({message:"Invalid question paperId provided"})
    if(questionPaper.teacherId.toString()!==req.user._id.toString()) return res.status(400).send({message:"Unauthorized"})
    let students =[]
    for(let x =0;x<req.body.studentIds.length;x++){
        let student = await validateStudentIdAndReturnStudent(req.body.studentIds[x])
        if(!student)return res.status(400).send({message:"Invalid studentIds paperId provided"})
        else{
    students.push(student)
    }
    }
    req.students = students
    req.questionPaper = questionPaper
    next()
}



exports.validateQpIdAndReturQp = async(questionPaperId)=>{
    try{
        let questionPaper = await QuestionPaper.findById(questionPaperId);
        if(questionPaper) return questionPaper
        else return false
    }
    catch(err){
        console.log(err)
        return false
    }

}

async function validateStudentIdAndReturnStudent  (studentId){
    try{
        let student = await User.findById(studentId);
        if(student && student.authorized&&student.userType=="student") {
            return student}
        else return false
    }
    catch(err){
        console.log(err)
        return false
    }
}