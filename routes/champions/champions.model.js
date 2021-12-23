const RiotAPI = require("../../api/RiotAPI");

// This middleware is responsible for fetching the champions from the API
const championsMiddleware = async (req, res, next) => {
  let response;
  try {
    response = await RiotAPI.championList();
  } catch (err) {
    response = err;
  }
  req.data = response;
  next();
};

module.exports = championsMiddleware;
