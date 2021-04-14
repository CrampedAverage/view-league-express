const express = require("express");
const router = express.Router();
const regionObj = require("../server");
const API = require('../util/riotAPI') 

let data;

// This middleware is responsible for fetching the champions from the API
router.get("/",  async (req, res, next) => {
    try {
        data = await API.championList()
        data = await Object.values(data.data)
    }
    catch(err) {
        console.log(err)
    }
    next();
});

router.get("/", (req, res) => {
    res.render("champions", {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css",
        region: regionObj.region,
        champions: data,
    });
});

module.exports = router;
