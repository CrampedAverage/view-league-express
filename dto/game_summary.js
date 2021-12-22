const LeagueStats = require("../helper/LeagueStats");

function game_summary(data, playerIndex) {
  let teamKills = {
    100: 0,
    200: 0
  };
  // Get the total team kills for each player.
  data.participants.forEach(player => {
    if (player.teamId === 100) teamKills[100] += player.kills
    if (player.teamId === 200) teamKills[200] += player.kills
  })

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
  }

  return dto
}

module.exports = game_summary

// gameInfo = gameInfo  

            //     const games = {
            //         champion: matchId.champion,
            //         win: player.stats.win ? "Victory" : "Defeat",
            //         totalTeamKills: LeagueStats.getTotalKills(match, player),
            //         kills: player.stats.kills,
            //         deaths: player.stats.deaths,
            //         assists: player.stats.assists,
            //         killAssist: player.stats.kills + player.stats.assists,
            //         kda: LeagueStats.getKDA(
            //             player.stats.kills,
            //             player.stats.assists,
            //             player.stats.deaths
            //         ),
            //         kpa: LeagueStats.getKPA(
            //             player.stats.kills,
            //             LeagueStats.getTotalKills(match, player),
            //             player.stats.assists
            //         ),
            //         level: player.stats.champLevel,
            //         cs:
            //             player.stats.totalMinionsKilled +
            //             player.stats.neutralMinionsKilled,
            //         cspm: LeagueStats.getCSPM(
            //             player.stats.totalMinionsKilled +
            //                 player.stats.neutralMinionsKilled,
            //             match.gameDuration
            //         ),
            //         time: Time.getTime(match.gameDuration),
            //         date: Time.getGameDate(match.gameCreation),
            //         timeDiff: Time.calcDiff(
            //             match.gameCreation,
            //             match.gameDuration
            //         ),
            //         item1:
            //             player.stats.item0 === 0
            //                 ? undefined
            //                 : player.stats.item0,
            //         item2:
            //             player.stats.item1 === 0
            //                 ? undefined
            //                 : player.stats.item1,
            //         item3:
            //             player.stats.item2 === 0
            //                 ? undefined
            //                 : player.stats.item2,
            //         item4:
            //             player.stats.item3 === 0
            //                 ? undefined
            //                 : player.stats.item3,
            //         item5:
            //             player.stats.item4 === 0
            //                 ? undefined
            //                 : player.stats.item4,
            //         item6:
            //             player.stats.item5 === 0
            //                 ? undefined
            //                 : player.stats.item5,
            //     };
            //     return games;
            // });