const jwt = require("jsonwebtoken");
const { JWT_CONFIG } = require("../config/config");
const ERROR_CODES = require("../common/errorCodes");
const createBaseResponse = require("../utils/baseResponse");

exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
    JWT_CONFIG.TOKEN_SECRET,
    { expiresIn: JWT_CONFIG.EXPIRES }
  );
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(400)
      .json(
        createBaseResponse(
          true,
          undefined,
          ERROR_CODES.ERR_00001,
          req.headers["language"]
        )
      );
  jwt.verify(token, JWT_CONFIG.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json(
          createBaseResponse(
            trye,
            undefined,
            ERROR_CODES.ERR_00001,
            req.headers["language"]
          )
        );
    }

    req.user = user;
    next();
  });
};
