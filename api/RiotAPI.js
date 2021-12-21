require("dotenv").config();
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

async function fetchUrl(url) {
    const fetchData = await fetch(url);
    const data = await fetchData.json();
    return data;
}

class RiotAPI {
    static async getVersion() {
        const url = "https://ddragon.leagueoflegends.com/api/versions.json";
        const data = await fetchUrl(url);
        const version = await data[0];
        return version;
    }

    static async championList() {
        const url =
            "http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json";
        let data = await fetchUrl(url);

        data = Object.values(data.data);
        return data;
    }

    static async getChampion() {
        const version = this.getVersion();
        const url = `https://cdn.communitydragon.org/${version}/champion/${id}/square`;
        const data = await fetchUrl(url);
        return data;
    }

    /**
     * SUMMONER-V4 - Get player information using summoner name
     * @param {string} region 
     * @param {string} sumName 
     * @returns User's info and uuids
     */
    static async summonerID(region, sumName) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
    }

    /**
     * MATCH-V5 - Get a list of match ids by puuid
     * @param {string} continent 
     * @param {uuid} puuid 
     * @param {int} end 
     * @returns list of match ids
     */
    static async matches(continent, puuid) {
        const url = `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
       }

    /**
     * MATCH-V5 - Get a response object with full information on match
     * @param {string} continent 
     * @param {uuid} matchId 
     * @returns object of match information
     */
    static async match(continent, matchId) {
        const url = `https://${continent}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
    }

    /**
     * LEAGUE-V4 - Get an array of user's ranks and rank info
     * @param {string} region 
     * @param {uuid} sumID 
     * @returns Array of user's rank info
     */
    static async getUserRank(region, sumID) {
        const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumID}?api_key=${apiKey}`;
        let data = await fetchUrl(url);
        return data;
    }
}

module.exports = RiotAPI;
