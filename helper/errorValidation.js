const apiResponseValidation = (statusCode, api) => {
  let errorMessage = {};
  switch (statusCode) {
    case 400:
      errorMessage.msg = "Bad Request"
      break;
    case 429:
      errorMessage.msg = "Rate Limit Exceeded";
      break;
    case 404:
      errorMessage.msg = "Data Not Found";
      break;
    default:
      errorMessage.msg = "Server Error"; 
    }
    errorMessage.api = api;
  return errorMessage
}

module.exports = apiResponseValidation;