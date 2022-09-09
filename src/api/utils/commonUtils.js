const { NON_STRING_VALUES } = require("../common/common");

exports.handleNonStringValuesObject = (obj) => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (NON_STRING_VALUES.find((non) => non.nonString === value)) {
      newObj[key] = NON_STRING_VALUES.find(
        (non) => non.nonString === value
      )?.value;
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
};

exports.handleNonStringValuesString = (str) => {
  if (NON_STRING_VALUES.find((non) => non.nonString === str)) {
    return NON_STRING_VALUES.find((non) => non.nonString === str)?.value;
  }

  return str;
};
