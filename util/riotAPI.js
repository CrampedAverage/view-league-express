require("dotenv").config();
const fetch = require('node-fetch')

const apiKey = process.env.API_KEY;

const championList = async () => {
    const url = "http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion.json";
    const fetchData = await fetch(url)
    const data =  await fetchData.json()
    return data
};


module.exports = {championList};