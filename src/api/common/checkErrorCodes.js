const ERROR_CODES = require("../common/errorCodes");

module.exports = (error) => {
  return error.code ? error.code : ERROR_CODES.ERR_00002;
};
