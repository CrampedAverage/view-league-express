const express = require("express");
const router = express.Router();
const regions = require("../../util/regions");

router.use((req, res, next) => {
    if (!req.cookies.region) res.cookie("region", "euw")
    next();
})

router.get("/", (req, res) => {
    let region = req.cookies.region;
    res.redirect(`/${region}`);
});

// Route when searching a player
router.post("/", (req, res) => {
    console.log(req.body)
    res.redirect(`/player/${req.body.summoner}`);
});

router.get("/:region", (req, res) => {
    // if (!regions[req.params.region]) return res.redirect('/error')
    
    res.render("home", {
        title: "viewLeague || View Players",
        name: "Home Page",
        style: "home.css",
        region: req.cookies.region,
    });
    res.status(200)
});

// Changes the region
router.post("/:region", (req, res) => {
    if (req.body.region) {
        req.cookies.region = req.body.region;
        let region = req.cookies.region
        return res.redirect(`${region}`);
    }
    res.status(400)
});

module.exports = router;