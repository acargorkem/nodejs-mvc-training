const express = require("express");

const authController = require("../controllers/auth");
const validator = require("../middleware/validation");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  validator.loginRules(),
  validator.loginCheck,
  authController.postLogin
);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  validator.signupRules(),
  validator.signupCheck,
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getResetPassword);

router.post("/reset", authController.postResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
