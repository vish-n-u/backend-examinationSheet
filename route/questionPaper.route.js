const jwtValidation = require("../validation/jwt.validation")
const qPValidation = require("../validation/questionPaper.validation")
const qPController = require("../controller/questionPaper.controller")


const qpRoute = (app)=>{
    app.post("/examinationpanel/api/v1/questionpaper",[jwtValidation.verifyJwt,qPValidation.isTeacher],qPController.createQp)
    app.post("/examinationpanel/api/v1/questionpapers",[jwtValidation.verifyJwt,qPValidation.isTeacher],qPController.getQuestionPapersByTeacherId)
    app.put("/examinationpanel/api/v1/questionpapers",[jwtValidation.verifyJwt,qPValidation.isTeacher,qPValidation.validateAssignQpToStudents],qPController.assignQpToStudents)
    app.post("/examinationpanel/api/v1/questionpapersstudent",[jwtValidation.verifyJwt],qPController.getAllQuestionPaperOfStudent)
}

module.exports = qpRoute