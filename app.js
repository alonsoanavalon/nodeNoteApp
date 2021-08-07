const express = require('express')
const app = express()
const port = 3000
const test = require('./routes/test')


let myLogger = function (req, res, next) {
    console.log("Logeado")
    next()
}

let requestPedo = function (req, res, next) {
    req.requestPedo = "Prueba"
    next()
}


app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(myLogger)
app.use(requestPedo)

app.use('/test', test)

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log(req.requestPedo)
    console.log(req.query)
  
})
app.post('/', (req, res) => {
    res.send("Post desde index")
    console.log('Entraron a post')
    request = req.body.name
    console.log(request)
    

})



app.listen(port, () => {
    console.log('Ejemplo')
})