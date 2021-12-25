const LeagueStats = require("../helper/LeagueStats");
const Time = require('../helper/Time')

function game_summary(data, playerIndex) {
  const playerData = data.participants[playerIndex];

  const dto = {
    champion: playerData.championName,
    win: playerData.win,
    kills: playerData.kills,
    deaths: playerData.deaths,
    role: playerData.role,
    totalTeamKills: LeagueStats.getTotalKills(data, playerData),
    assists: playerData.assists,
    killAssists: playerData.assists + playerData.kills,
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
    cspm: LeagueStats.getCS(
      LeagueStats(playerData.neutralMinionsKilled, playerData.totalMinionsKilled),
      data.gameDuration
    ),
    time: Time.getTime(data.gameDuration),
    date: Time.getGameDate(data.gameCreation),
    timeDiff: Time.calcDiff(
      data.gameCreation,
      data.gameDuration
    ),
    item1: 
      playerData.item0 === 0
        ? undefined
        : playerData.item0,
    item2:
      playerData.item1 === 0
        ? undefined
        : playerData.item1,
    item3:
      playerData.item2 === 0
        ? undefined
        : playerData.item2,
    item4:
      playerData.item3 === 0
        ? undefined
        : playerData.item3,
    item5:
      playerData.item4 === 0
        ? undefined
        : playerData.item4,
    item6:
      playerData.item5 === 0
        ? undefined
        : playerData.item5,
  };

  return dto;
}

module.exports = game_summary;
