const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const createBaseResponse = require("../utils/baseResponse");
const ERROR_CODES = require("../common/errorCodes");
const { SALT_ROUNDS } = require("../common/common");
const { generateAccessToken } = require("../middlewares/auth");

exports.login = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await UserModel.findOne({ email: body.email });
    if (user) {
      const compare = await bcrypt.compare(body.password, user.password);
      if (compare) {
        const token = generateAccessToken(user);
        const response = {
          token: token,
        };
        return res
          .status(200)
          .json(
            createBaseResponse(
              false,
              response,
              undefined,
              req.headers["language"]
            )
          );
      } else {
        throw { message: ERROR_CODES.ERR_00004 };
      }
    } else {
      throw { message: ERROR_CODES.ERR_00004 };
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};
exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const hash = await bcrypt.hash(body.password, SALT_ROUNDS);
    if (hash) {
      body.password = hash;
      await UserModel.create(body);
      delete body.password;
      return res
        .status(200)
        .json(
          createBaseResponse(false, body, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00003 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user) {
      return res
        .status(200)
        .json(
          createBaseResponse(false, user, undefined, req.headers["language"])
        );
    } else {
      throw { message: ERROR_CODES.ERR_00004 };
    }
  } catch (err) {
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};
exports.forgotpassword = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await UserModel.findById(req.user.id);
    if (user) {
      const compare = await bcrypt.compare(body.oldPassword, user.password);
      if (compare) {
        const hash = await bcrypt.hash(body.newPassword, SALT_ROUNDS);

        user.password = hash;

        user.save();

        return res
          .status(200)
          .json(
            createBaseResponse(false, user, undefined, req.headers["language"])
          );
      } else {
        throw { message: ERROR_CODES.ERR_00004 };
      }
    } else {
      throw { message: ERROR_CODES.ERR_00004 };
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          err.message,
          req.headers["language"]
        )
      );
  }
};
