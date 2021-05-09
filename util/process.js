const riotAPI = require("./riotAPI")

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

class Process  {
    constructor(userID) {
        this.userID = userID
        this.getGameInfo = this.getGameInfo.bind(this)
        this.championFilter = this.championFilter.bind(this)
        this.matchesInfo = this.matchesInfo.bind(this)
    }
    
    championFilter(match) {
        let champion =  riotAPI.championList()
        .then(list => {
            return list.find(champ=> champ.key == match.champion)
            
        })
        .then(champ => {

            return {
                id: champ.key,
                name: champ.name,
                img: champ.image.full
                
            }
        })
        return champion
    }


    getGameInfo(currentMatch) {
        const gameInfoForPlayer = riotAPI.match(currentMatch.gameId)
        .then(match => {
            const playerId =  match.participantIdentities.filter(id => id.player.accountId === this.userID)

            const playerInfo = match.participants.filter(player => playerId[0].participantId == player.participantId)
            // console.log(match)
            let time = match.gameDuration / 60
            console.log(time)
            return {
                player: playerInfo[0],
                win: playerInfo[0].stats.win,
                kills: playerInfo[0].stats.kills,
                deaths: playerInfo[0].stats.deaths,
                assists: playerInfo[0].stats.assists,
                level: playerInfo[0].stats.champLevel,
                cs: playerInfo[0].stats.totalMinionsKilled,
                time: match.gameDuration,
            };
        })


        return gameInfoForPlayer
    }

    async matchesInfo(matchList) {

        const championsPlayed = await Promise.all(
            matchList.matches.map(this.championFilter)
        )

        const gameInfo = await Promise.all(
            matchList.matches.map(this.getGameInfo)
        )

        return {
            championsPlayed,
            gameInfo
        }
        
    }
}


module.exports = Process