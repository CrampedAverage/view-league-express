const express = require("express");
const router = express.Router();
const riotAPI = require("../../util/riotAPI");

let data;

// This middleware is responsible for fetching the champions from the API
router.get("/", async (req, res, next) => {
    try {
        data = await riotAPI.championList();
    } catch (err) {
        console.log(err);
    }
    next();
});

router.get("/", (req, res) => {
    res.render("champions", {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css",
        region: req.cookies.region,
        champions: data,
    });
});

module.exports = router;
