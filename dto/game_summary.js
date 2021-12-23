const LeagueStats = require("../helper/LeagueStats");

function game_summary(data, playerIndex) {
  const playerData = data.participants[playerIndex]

  const dto = {
    champion: playerData.championName,
    win: playerData.win,
    kills: playerData.kills,
    deaths: playerData.deaths,
    role: playerData.role,
    totalTeamKills: LeagueStats.getTotalKills(
      data,
      playerData
    ),
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
    cs: playerData.neutralMinionsKilled + playerData.totalMinionsKilled,
    cspm: '',
  }

  return dto
}

module.exports = game_summary