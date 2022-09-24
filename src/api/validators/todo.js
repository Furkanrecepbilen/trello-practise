const { check, validationResult } = require("express-validator");
const createBaseResponse = require("../utils/baseResponse");
const ERROR_CODES = require("../common/errorCodes");

exports.validateCreateTodo = [
  check("header").exists().isString().notEmpty().isLength({ min: 1 }),
  check("content").exists().isString().notEmpty().isLength({ min: 10 }),
  check("deadLine").exists().isString().notEmpty(),
];

exports.validateCreateTodoStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00005,
          req.headers["language"]
        )
      );
  } else {
    next();
  }
};

exports.validateUpdateTodo = [
  check("header").exists().isString().notEmpty().isLength({ min: 1 }),
  check("content").exists().isString().notEmpty().isLength({ min: 10 }),
  check("deadLine").exists().isString().notEmpty(),
];

exports.validateUpdateTodoStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00005,
          req.headers["language"]
        )
      );
  } else {
    next();
  }
};
exports.validateCreateComment = [
  check("content").exists().notEmpty().isString().isLength({ min: 3 }),
];

exports.validateCreateCommentStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00005,
          req.headers["language"]
        )
      );
  } else {
    next();
  }
};
