const LeagueStats = require("../helpers/leagueStats");

const user_ranks = (data) => {
  const dto = {
    tier: LeagueStats.capitaliseWord(data.tier),
    rank: data.rank,
    points: data.leaguePoints,
    wins: data.wins,
    loss: data.losses,
    wr: LeagueStats.getWinrate(data.wins, data.losses),
  };

  return dto;
};

module.exports = user_ranks;
