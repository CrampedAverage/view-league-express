const RiotAPI = require("../api/RiotAPI");
const game_summary = require("../dto/game_summary");
const apiResponseValidation = require("./errorValidation");

class Games {
    constructor(puuid, continent) {
        this.puuid = puuid;
        this.continent = continent;
        this.matches = [];
        this.getGameSummary = this.#getGameSummary.bind(this)
    }

    /**
     * Returns a list of matches from the users match history
     * @param {int} numberOfGames number of games to show in history
     * @return list of detailed match
    **/
    async getMatches(numberOfGames = 10) {

        try {
            const rawDataMatches = await RiotAPI.matches(this.continent, this.puuid, numberOfGames)
            if (rawDataMatches.status) throw apiResponseValidation(rawGameInfo.status.status_code, "game_info")
            
            rawDataMatches.forEach(async (matchId, index) => {
                
            })
            this.getGameSummary(rawDataMatches[0])

        }
        catch(err) {
            console.log("error", err)
        }
        return this.matches;
        
    }
    /**
     * 
     * @param {uuid} matchId 
     * @returns 
     */
    async #getGameSummary(matchId) {
        let gameInfo = {}
        try {
            const rawGameInfo = await RiotAPI.match(this.continent, matchId)
            const { metadata, info } = rawGameInfo
            const playerIndex = metadata.participants.findIndex(id => id === this.puuid)
            console.log(playerIndex)
            if (rawGameInfo.status) throw apiResponseValidation(rawGameInfo.status.status_code, "game_info")
            gameInfo.game = game_summary(info, playerIndex)
            console.log(gameInfo.game)
        } catch(err) {
            console.log(err)
        }

        
        return [];
    }

    async matchesInfo(matchList) {
        let gameInfo = await Promise.all(
            matchList.matches.map(this.getGameInfo)
        );

        const version = await Promise.all(
            matchList.matches.map(RiotAPI.getVersion)
        );

        return {
            version,
            gameInfo,
        };
    }
}

module.exports = Games;
