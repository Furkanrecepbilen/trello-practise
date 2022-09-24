const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/user");
const { authenticateToken } = require("../middlewares/auth");
const UserValidator = require("../validators/user");

Router.post(
  "/register",
  UserValidator.validateRegister,
  UserValidator.validateRegisterStatus,
  UserController.register
);
Router.post(
  "/login",
  UserValidator.validateLogin,
  UserValidator.validateLoginStatus,
  UserController.login
);

Router.get("/getProfile", authenticateToken, UserController.getProfile);

Router.post(
  "/forgot-password",
  authenticateToken,
  UserValidator.validateForgotPassword,
  UserValidator.validateForgotPasswordStatus,
  UserController.forgotpassword
);

module.exports = Router;
