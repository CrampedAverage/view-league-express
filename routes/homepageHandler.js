const express = require("express");
const router = express.Router();
const regionObj = require('../server')

router.get("/", (req, res) => {
    res.render("home", {
        title: "viewLeague || View Players",
        name: "Home Page",
        style: "home.css",
        region: regionObj.region,
    });
});

router.post("/", (req, res) => {
    res.redirect(`${regionObj.region}/player/${req.body.summoner}`);
});

module.exports = router;
