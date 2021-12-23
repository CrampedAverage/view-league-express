const express = require("express");
const router = express.Router();
const PlayerModel = require("./player.model.js");

router.get("/", (req, res) => {
  res.send("he12321he");
});

// Route when searching a player
router.post("/", (req, res) => {
  res.redirect(`/player/${req.body.summoner}`);
});

router.get("/:playerName", async (req, res) => {
  // Basic player informations
  const Player = new PlayerModel(req.params.playerName, req.cookies.region);
  playerInfo = await Player.playerInfo();
  playerMatches = Player.playerMatches();
  let obj;
  let location;
  if (playerInfo.found) {
    location = "player";
    obj = {
      title: `${playerInfo.summonerName} || viewLeague`,
      name: playerInfo.summonerName,
      style: "player.css",
      games: [],
      user: playerInfo,
      region: req.cookies.region,
    };
  }
  if (!playerInfo.found) {
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
