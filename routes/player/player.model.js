const RiotAPI = require("../../api/RiotAPI");
const apiResponseValidation = require("../../helper/errorValidation");
const LeagueStats = require("../../helper/LeagueStats");
const { user_ranks } = require("../../dto")
const continents = require("../../util/continents");
const regions = require("../../util/regions");

class Player {
    constructor(summonerName, region) {
        this.summonerName = summonerName;
        this.region = regions[region];
        this.continent = continents[region];
        this.ids = {accountId: '', puuid: ''}
        this.leagues = {ranked_solo: {}, ranked_flex: {}}
        this.data = {}
    }

    async playerInfo() {
        try {
            const rawDataInfo = await RiotAPI.summonerID(this.region, this.summonerName)
            if (rawDataInfo.status) throw apiResponseValidation(rawDataInfo.status.status_code, "player_info")
            this.ids = {accountId: rawDataInfo.accountId, puuid: rawDataInfo.puuid, summId: rawDataInfo.id}

            const rawDataRanks = await RiotAPI.getUserRank(this.region, this.ids.summId)
            if (rawDataRanks.status) throw apiResponseValidation(rawDataRanks.status.status_code, "player_ranks")

            rawDataRanks.forEach(league => {
                if (league.queueType === "RANKED_SOLO_5x5") this.leagues.ranked_solo = user_ranks(league)
                if (league.queueType === "RANKED_FLEX_SR") this.leagues.ranked_flex = user_ranks(league)
            })

            this.data = {
                summonerName: this.summonerName,
                league: this.leagues,
                icon: rawDataInfo.profileIconId,
                level: rawDataInfo.summonerLevel,
                found: true,
                limitReached: false
            }
        }
        catch (err) {
            switch (err.msg) {
                case "Data Not Found":
                    this.data.found = false;
                    break
                case "Rate Limit Exceeded":
                    this.data.limitReached = true;
                    break;
                }
        }
        return this.data
    }
}

module.exports = Player;