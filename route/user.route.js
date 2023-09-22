const userController = require("../controller/user.controller")
const jwtValidation = require("../validation/jwt.validation");
const userValidation = require("../validation/user.validation");

const userRoute = (app) => {
  app.post(
    "/examinationpanel/api/v1/user",

    [jwtValidation.verifyJwt],
    userController.getUserDetail
  );
  app.post("/examinationpanel/api/v1/users", [jwtValidation.verifyJwt,userValidation.isAdmin],
  userController.getAllUserDetail)
  app.put("/examinationpanel/api/v1/users/:id", [jwtValidation.verifyJwt,userValidation.isAdmin,userValidation.authenticateUserByObjectId],userController.authorizeUser)
  app.post("/examinationpanel/api/v1/studentusers",[jwtValidation.verifyJwt,userValidation.isTeacher],userController.getAllStudents)
  
}

module.exports = userRoute