const express = require("express");
const router = express.Router();
const PlayerModel = require("./player.model.js");
const playerView = require("./player.view.js");

router.get("/", (req, res) => {
  res.send("he12321he");
});

// Route when searching a player
router.post("/", (req, res) => {
  res.redirect(`/player/${req.body.summoner}`);
});

router.get("/:playerName", async (req, res) => {
  const Player = new PlayerModel(
    req.params.playerName,
    req.cookies.region ? req.cookies.region : "euw"
  );

  const playerInfo = await Player.playerInfo();
  const playerMatches = await Player.playerMatches();

  const view = playerView(playerInfo, playerMatches, req);
  res.status(view.status);
  res.render(view.location, view.data);
});

router.get("/not-found", (req, res) => {
  res.send("wss");
});

module.exports = router;
