const LeagueStats = require("../helper/LeagueStats");
const Time = require('../helper/Time');

function game_summary(data, playerIndex, gameType) {
  const playerData = data.participants[playerIndex];

  const dto = {
    champion: playerData.championName,
    win: playerData.win ? "Victory" : "Defeat",
    stats: {
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
      {
        item: playerData.item0, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
      {
        item: playerData.item1, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
      {
        item: playerData.item2, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
      {
        item: playerData.item3, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
      {
        item: playerData.item4, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
      {
        item: playerData.item5, 
        version: data.gameVersion.split('.').slice(0, 2).join('.')
      },
    ],
    version: data.gameVersion.split('.').slice(0, 2).join('.'),
    queueType: gameType,

  };

  return dto;
}

module.exports = game_summary;
