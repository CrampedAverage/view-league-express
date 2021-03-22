const express = require('express')
const router = express.Router()

const slogans = ['view: Summoners', 'view: Champions', 'view: Builds']

router.get('/', (req, res) => {
    res.render('home', {
        title: "viewLeague || View Players",
        name: 'Home Page',
        style: "home.css",
        slogan: slogans
    })
})

module.exports = router