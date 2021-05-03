const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.cookies.region)
    if (req.cookies.region) {
        region = req.cookies.region
        res.redirect(`/${region}`);
    } else {
        res.cookie('region', 'euw')
        region = req.cookies.region
        res.redirect(`/${region}`);
    }
})

router.post('/', (req, res) => {
    res.cookie('region', req.body.region)
    res.redirect(`/${req.body.region}`)
})

module.exports = router;
