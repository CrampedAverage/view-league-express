const express = require("express");
const router = express.Router();
const regionObj = require("../../server");

router.get("/", (req, res) => {
    res.render("home", {
        title: "viewLeague || View Players",
        name: "Home Page",
        style: "home.css",
        region: req.cookies.region,
    });
});

router.post("/", (req, res) => {
    if (req.body.region) {
        regionObj.region = req.body.region;
        res.redirect(`${regionObj.region}`);
    }
    res.redirect(`${req.cookies.region}/player/${req.body.summoner}`);
});

module.exports = router;
