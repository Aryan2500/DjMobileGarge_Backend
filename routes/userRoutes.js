const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const authmiddleware = require("../middleware/auth/authmiddleware");
const emailValidator = require("../middleware/validator/emailValidator");
const emailVerification = require('../middleware/auth/verifyEmail');
const checkToken= require("../middleware/auth/checkTokenmiddleware")


router.post(
  "/register",
  emailValidator.emailValidator,
  userValidator.validateUser,
  userController.CreateNewUser
);

router.post("/login", emailValidator.emailValidator, authmiddleware.userLogin);

router.post("/email-verification/", emailVerification.sendVerificationLink);

router.get("/verify-emailToken/:token", emailVerification.verifyEmail);

router.post("/upload-avatar" ,checkToken, userController.uploadAvatar)
module.exports = router;

