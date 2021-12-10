const express = require("express");
const championsMiddleware = require("./champions.model");
const router = express.Router();

router.get("/", championsMiddleware, (req, res) => {
    let data = req.data;
    res.render("champions", {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css",
        region: req.cookies.region,
        champions: data,
    });
});


router.get("/:id", (req, res) => {
    res.send("champion" + req.params.id)
})
module.exports = router;
