const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "viewLeague || View Players",
        name: "Home Page",
        style: "home.css",
    });
});

router.post("/", (req, res) => {
    res.redirect(`/${req.body.summoner}`);
});

module.exports = router;
