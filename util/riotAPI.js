require("dotenv").config();
const { json } = require("express");
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

class riotAPI {
    static async championList() {
        const url =
            "http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json";
        const fetchData = await fetch(url);
        let data = await fetchData.json(); 
        data = Object.values(data.data); 
        return data;
    }

    static async summonerID(region, sumName) {
        const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${apiKey}`
        const fetchData = await fetch(url)
        const data = await fetchData.json();
        return data
    }
    

    static async matches(region, accID, end) {
        const url = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accID}?endIndex=${end}&api_key=${apiKey}`
        const fetchData = await fetch(url)
        let data = await fetchData.json()
        return data
    }


    static async match(matchId) {
        const url = `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`
        const fetchData = await fetch(url)
        const data = await fetchData.json()
        return data
    }
}

module.exports =  riotAPI;
