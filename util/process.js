const { resolveConfig } = require("prettier");
const LeagueStats = require("../helper/leagueStats");
const Time = require("../helper/Time");
const riotAPI = require("./riotAPI");

class Process {
    constructor(userID) {
        this.userID = userID;
        this.getGameInfo = this.getGameInfo.bind(this);
    }

    champion(match) {
        return match.champion;
    }

    getGameInfo(currentMatch) {
        const gameInfoForPlayer = riotAPI
            .match(currentMatch.gameId)
            .then((match) => {
                let playerId;

                playerId = match.participantIdentities.filter(
                    (id) => id.player.accountId === this.userID
                );

                const playerInfo = match.participants.filter(
                    (player) =>
                        playerId[0].participantId == player.participantId
                );
                const player = playerInfo[0];

                const games = {
                    champion: this.champion(currentMatch),
                    win: player.stats.win ? "Victory" : "Defeat",
                    totalTeamKills: LeagueStats.getTotalKills(match, player),
                    kills: player.stats.kills,
                    deaths: player.stats.deaths,
                    assists: player.stats.assists,
                    killAssist: player.stats.kills + player.stats.assists,
                    kda: LeagueStats.getKDA(
                        player.stats.kills,
                        player.stats.assists,
                        player.stats.deaths
                    ),
                    kpa: LeagueStats.getKPA(
                        player.stats.kills,
                        LeagueStats.getTotalKills(match, player),
                        player.stats.assists
                    ),
                    level: player.stats.champLevel,
                    cs:
                        player.stats.totalMinionsKilled +
                        player.stats.neutralMinionsKilled,
                    cspm: LeagueStats.getCSPM(
                        player.stats.totalMinionsKilled +
                            player.stats.neutralMinionsKilled,
                        match.gameDuration
                    ),
                    time: Time.getTime(match.gameDuration),
                    date: Time.getGameDate(match.gameCreation),
                    timeDiff: Time.calcDiff(
                        match.gameCreation,
                        match.gameDuration
                    ),
                    item1:
                        player.stats.item0 === 0
                            ? undefined
                            : player.stats.item0,
                    item2:
                        player.stats.item1 === 0
                            ? undefined
                            : player.stats.item1,
                    item3:
                        player.stats.item2 === 0
                            ? undefined
                            : player.stats.item2,
                    item4:
                        player.stats.item3 === 0
                            ? undefined
                            : player.stats.item3,
                    item5:
                        player.stats.item4 === 0
                            ? undefined
                            : player.stats.item4,
                    item6:
                        player.stats.item5 === 0
                            ? undefined
                            : player.stats.item5,
                };
                return games;
            });
        return gameInfoForPlayer;
    }

    async matchesInfo(matchList) {
        let gameInfo = await Promise.all(
            matchList.matches.map(this.getGameInfo)
        );

        const version = await Promise.all(
            matchList.matches.map(riotAPI.getVersion)
        );

        return {
            version,
            gameInfo,
        };
    }
}

module.exports = Process;
