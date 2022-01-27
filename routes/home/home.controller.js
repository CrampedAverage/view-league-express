const express = require("express");
const router = express.Router();
const regions = require("../../util/regions");

router.use((req, res, next) => {
  if (!req.cookies.region) res.cookie("region", "euw");
  next();
});

router.get("/", (req, res) => {
  let region = req.cookies.region ? req.cookies.region : 'euw';
  res.redirect(`/${region}`);
});

router.get("/:region", (req, res) => {
  let region;
  if (regions[req.params.region]) {
    region = req.params.region;
    res.cookie("region", region);
  }

  res.render("home", {
    title: "viewLeague || View Players",
    name: "Home Page",
    style: "home.css",
    region: region ? region : req.cookies.region,
  });
  res.status(200);
});

// Changes the region
router.post("/:region", (req, res) => {
  if (req.body.region) {
    let region = req.body.region;
    res.cookie("region", region);
    return res.redirect(`${region}`);
  }
  res.status(400);
});

module.exports = router;
