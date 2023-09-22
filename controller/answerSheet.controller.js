const AnswerSheet = require("../model/answerPaper.model")
 
exports.createAS = async(req,res)=>{
    
    try{
        const apObject = {
            studentId:req.user._id,
            questionPaperId : req.body.questionPaperId,
            answers : req.body.answers,
        }
        const newAnswersheet = await AnswerSheet.create(apObject)
        req.user.answerSheetIds.push(newAnswersheet._id)
        await req.user.save()
        return res.status(201).send({message:newAnswersheet})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }

}


exports.getAllAnswerSheetByQPId = async(req,res)=>{
    console.log("controller getAllAnswerSheetByQPId")
    try{
        const answerSheets = await AnswerSheet.find({questionPaperId:req.params.id})
                                                .populate("studentId")

        console.log("answerSheets----",answerSheets)
        return res.status(200).send({message:answerSheets})


    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}