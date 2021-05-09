const e = require("express");
const express = require("express");
const router = express.Router();
const regionObj = require("../server");
const Process = require("../util/process");
const riotAPI = require('../util/riotAPI')

// let summonerName;
let found;
let limitReached = false
let games;

router.get("/", async (req, res, next) => {
    path = req.originalUrl.split('/')[3];
    region = req.originalUrl.split('/')[1]
    if(!(region in regionObj.regions)) {
        res.redirect("/error")

    }
    regionCode = regionObj.regions[region]
    summonerName = decodeURI(path);
    try {
        // Verify if user is found
        const passedData = await riotAPI.summonerID(regionCode, summonerName)
        if (passedData.status) {
            switch (passedData.status.status_code ) {
                case 429:
                    throw('Rate Limit Exceeded');
                case 404:
                    throw('User Not Found');
                default:
                    throw('Error')
        }}
        

        limitReached = false
        found = true

        const matches = await riotAPI.matches(regionCode, passedData.accountId, 1).then(match => match)
        if (matches) {
            const user = await new Process(passedData.accountId)
            const processedMatchInfo = await user.matchesInfo(matches) 
            games = Object.values(await processedMatchInfo)
            for (let i= 0; i < games[0].length; i++) {
                let championsPlayed=  games[0][i]
                let gameStats =  games[1][i]
                games[0][i] = {championsPlayed, gameStats}
            }

            games = games[0]
            console.log(games)
        }



            
    } catch(err) {
        console.log(err)
        if (err === 'Rate Limit Exceeded') {
            limitReached = true
        }
        if (err === 'User Not Found') {
            found = false
        }
    }
    next()
});


router.get("/", (req, res) => {
    let obj;
    let location;
    if (found) {
        location = "player"
        obj = {
            title: `${summonerName} || viewLeague`,
            name: summonerName,
            style: "player.css",
            games: games,
            region: req.cookies.region,
        }
    }
    if (!found) {
        location = "noUser"
        obj = {
            title: `Not Found || viewLeague`,
            style: "none.css",
            region: req.cookies.region,
        }
    }
    res.status(200)
    res.render(location, obj)

});

router.get('/error', (req,res) => {
    res.send("wss")
})

module.exports = router;
