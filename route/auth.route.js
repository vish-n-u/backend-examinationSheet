
const authController = require("../controller/auth.controller")
const authValidation = require("../validation/auth.validation");
const userValidation = require("../validation/user.validation");
const jwtValidation = require("../validation/jwt.validation")

const authRoute = (app) => {
  app.post(
    "/examinationpanel/api/v1/register",

    [authValidation.registrationValidation],
    authController.registration
  );
  app.post(
    "/examinationpanel/api/v1/login",
    [authValidation.validateLogin],
    authController.login
  );
  app.post("/examinationpanel/api/v1/admin",[jwtValidation.verifyJwt,userValidation.isAdmin],authController.adminAutherize)
  
};

module.exports = authRoute;