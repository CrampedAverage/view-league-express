const express = require("express");
const LeagueStats = require("../../helper/leagueStats");
const router = express.Router();
const regionObj = require("../../server");
const Process = require("../../helper/Process");
const riotAPI = require("../../api/RiotAPI");

// let summonerName;
let found;
let limitReached = false;
let games;
let userInfo;

router.get("/", (req, res) => {
    res.send("he12321he")
})

router.get("/:playerId", (req, res) => {
    let obj;
    let location;
    if (found) {
        location = "player";
        obj = {
            title: `${summonerName} || viewLeague`,
            name: summonerName,
            style: "player.css",
            games: games,
            user: userInfo,
            region: req.cookies.region,
        };
    }
    if (!found) {
        location = "noUser";
        obj = {
            title: `Not Found || viewLeague`,
            style: "none.css",
            region: req.cookies.region,
        };
    }
    res.status(200);
    res.render(location, obj);
});

router.get("/not-found", (req, res) => {
    res.send("wss");
});

module.exports = router;
