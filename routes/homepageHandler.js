const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: "viewLeague || View Players",
        name: 'Home Page'
    })
})

module.exports = router