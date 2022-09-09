exports.ACTIVE_STATUSSES = ["OTP_WAITING", "ENABLED"];
exports.LANGUAGES = {
  TR: "tr",
  EN: "en",
};
exports.PATHS = {
  POST: "post",
};

exports.SALT_ROUNDS = 10;

exports.NON_STRING_VALUES = [
  {
    nonString: "null",
    value: null,
  },
  {
    nonString: "undefined",
    value: undefined,
  },
  {
    nonString: "NaN",
    value: NaN,
  },
];
