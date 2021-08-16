const express = require('express')

const router = express.Router()
const User = require('../models/Users')

router.
route('/')
.get((req, res) => {
    res.render('signup')
})
.post( async (req, res) => {
    const {email, password} = req.body

    console.log(email, "email")

    const newUser = new User({
        email,
        password
    }) 

    newUser.password = await newUser.encryptPassword(password)    

    newUser.save()
    


    res.send("Ok")
})

module.exports = router