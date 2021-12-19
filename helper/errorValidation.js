const apiResponseValidation = (statusCode) => {
  let errorMessage;
  switch (statusCode) {
    case 400:
      errorMessage = "Bad Request"
      break;
    case 429:
      errorMessage = "Rate Limit Exceeded";
      break;
    case 404:
      errorMessage = "Data Not Found";
      break;
    default:
      errorMessage = "Server Error"; 
    }
  return errorMessage
}

module.exports = apiResponseValidation;