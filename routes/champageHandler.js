const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('champions', {
        title: "viewLeague || View Champions",
        name: "Champions Page",
        style: "champions.css"
    })
})

module.exports = router