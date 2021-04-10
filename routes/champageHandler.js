const express = require("express");
const router = express.Router();
const regionObj = require('../server')

// This middleware is responsible for fetching the champions from the API
router.get("/", (req, res, next) => {
    next();
});

router.get("/", (req, res) => {
    res.render("champions", {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css",
        region: regionObj.region
    });
});

module.exports = router;
