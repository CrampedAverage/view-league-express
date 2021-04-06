const express = require("express");
const router = express.Router();

// This middleware is responsible for fetching the champions from the API
router.get("/", (req, res, next) => {
    next();
});

router.get("/", (req, res) => {
    res.render("champions", {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css",
    });
});

module.exports = router;
