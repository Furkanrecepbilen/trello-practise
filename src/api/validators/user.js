const { check, validationResult } = require("express-validator");
const createBaseResponse = require("../utils/baseResponse");
const ERROR_CODES = require("../common/errorCodes");

exports.validateRegister = [
  check("username")
    .exists()
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  check("name").exists().notEmpty().isString(),
  check("surname").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isString(),
  check("password").exists().notEmpty().isString().isLength({ min: 6 }),
];
exports.validateRegisterStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00003,
          req.headers["language"]
        )
      );
  } else {
    next();
  }
};

exports.validateLogin = [
  check("email").exists().notEmpty().isString(),
  check("password").exists().notEmpty().isString(),
];
exports.validateLoginStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00003,
          req.headers["language"]
        )
      );
  } else {
    next();
  }
};
