const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log(Date.now())
    next()
})

router
.route('/')
.get((req, res) => {
    res.send('Me la pela')
    console.log(req.query)
})
.post((req, res) => {
    console.log(req.body)
    res.send("Me la pelas")
})

router
.route('/things/:id')
.get((req, res) => {
    console.log(req.params.id)
    res.send("OK")
})

router
.route('/things')
.get((req, res) => {
    res.send("Oka")
    console.log(req.query)
}) 
module.exports = router;