const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/user");
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

module.exports = Router;
