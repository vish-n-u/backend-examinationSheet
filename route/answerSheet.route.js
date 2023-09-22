const jwtVerification = require("../validation/jwt.validation")
const answerController = require("../controller/answerSheet.controller")

const answerRoute = (app)=>{
    app.post("/examinationpanel/api/v1/answer",[jwtVerification.verifyJwt],answerController.createAS);
    app.post("/examinationpanel/api/v1/allanswer/:id",[jwtVerification.verifyJwt],answerController.getAllAnswerSheetByQPId);
}

module.exports = answerRoute