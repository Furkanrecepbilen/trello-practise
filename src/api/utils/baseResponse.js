const { LANGUAGES } = require("../common/common");
const languages = require("../languages");
const { handleNonStringValuesString } = require("../utils/commonUtils");

module.exports = (isError, response, errorCode, lang) => {
  if (isError) {
    return generateMessage(errorCode, lang);
  } else {
    return {
      isError: false,
      payload: response,
    };
  }
};

generateMessage = (errorCode, lang) => {
  const language = handleNonStringValuesString(lang) ? lang : LANGUAGES.TR;

  const LANGUAGE = languages[language];

  return {
    isError: true,
    errorCode: errorCode?.key,
    message: LANGUAGE[errorCode?.value],
  };
};
