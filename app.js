const express = require('express')
const config = require('./config.js')
const app = express()
const port = 3000
const test = require('./routes/test')

//MongoDB

const mongoose = require('mongoose')
const mongoUri = `mongodb+srv://keyzen:${config.password}@cluster0.cdbzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then((db) => console.log("Mongodb is connected to", db.connection.host))
.catch((err) => console.error(err))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Tamos conectados')
})

const { Schema } = mongoose;
const blogSchema = new Schema ({
    title: String,
    author: String,
    votes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const myBlog = new Blog({title:'Messi se va del barsa', author:'Pedro', votes:2})

console.log(myBlog.title)

myBlog.save((err, blog) => {
    if (err) return console.error(err);
    console.log(myBlog.votes)
})

Blog.find((err, blogs) => {
    if (err) return console.error(err);
    console.log(blogs)
})

//Definicion Middlewares

let myLogger = function (req, res, next) {
    console.log("Logeado")
    next()
}

let requestPedo = function (req, res, next) {
    req.requestPedo = "Prueba"
    next()
}

//Middlewares
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