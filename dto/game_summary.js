const LeagueStats = require("../helper/LeagueStats");
const Time = require('../helper/Time');

function game_summary(data, playerIndex, gameType) {
  const playerData = data.participants[playerIndex];

  const dto = {
    champion: playerData.championName,
    stats: {
      win: playerData.win,
      kills: playerData.kills,
      deaths: playerData.deaths,
      assists: playerData.assists,
      kill_assists: playerData.assists + playerData.kills,
      kda: LeagueStats.getKDA(
        playerData.kills,
        playerData.assists,
        playerData.deaths
      ),
      kpa: LeagueStats.getKPA(
        playerData.kills,
        LeagueStats.getTotalKills(data, playerData),
        playerData.assists
      ),
      level: playerData.champLevel,
      cs: LeagueStats.getCS(playerData.neutralMinionsKilled, playerData.totalMinionsKilled),
      cspm: LeagueStats.getCSPM(
        LeagueStats.getCS(playerData.neutralMinionsKilled, playerData.totalMinionsKilled),
        data.gameDuration
      ),
      total_team_kills: LeagueStats.getTotalKills(data, playerData),
    },
    role: playerData.role,
    time: Time.getTime(data.gameDuration),
    date: Time.getGameDate(data.gameCreation),
    timeDiff: Time.calcDiff(
      data.gameCreation,
      data.gameDuration
    ),
    items: [
      playerData.item0,
      playerData.item1,
      playerData.item2,
      playerData.item3,
      playerData.item4,
      playerData.item5,
    ],
    version: data.gameVersion,
    queueType: gameType
  };

  return dto;
}

module.exports = game_summary;
