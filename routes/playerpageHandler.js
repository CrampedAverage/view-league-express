const express = require("express");
const router = express.Router();
const regionObj = require("../server");

let summonerName;

router.get("/", (req, res, next) => {
    const path = req.originalUrl.slice(1);
    summonerName = decodeURI(path);
    
    next();
});

router.get("/", (req, res) => {
    res.render("player", {
        title: `${summonerName} || viewLeague`,
        name: summonerName,
        style: "player.css",
        region: regionObj.region,
    });
});

module.exports = router;
