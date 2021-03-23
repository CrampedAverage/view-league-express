const express = require('express')
const router = express.Router()

let name = undefined;

router.get('/', (req, res, next) => {

    next();
})

router.get('/', (req, res) => {
    console.log(name)
    res.render('champions', {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css"
    })
})

module.exports = router