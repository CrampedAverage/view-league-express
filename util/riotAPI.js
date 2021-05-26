require("dotenv").config();
const { json } = require("express");
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

async function fetchUrl(url) {
    const fetchData = await fetch(url);
    const data = await fetchData.json();
    return data;
}

class riotAPI {
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

    static async summonerID(region, sumName) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
    }

    static async matches(region, accID, end) {
        const url = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accID}?endIndex=${end}&api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
    }

    static async match(matchId) {
        const url = `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`;
        const data = await fetchUrl(url);
        return data;
    }

    static async getUserRank(sumID) {
        const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumID}?api_key=${apiKey}`;
        let data = await fetchUrl(url);
        data = data[0];
        return data;
    }
}

module.exports = riotAPI;
