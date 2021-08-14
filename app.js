const express = require('express')
const config = require('./config.js')
const path = require('path')
const app = express()
const port = 3000
const test = require('./routes/test')
const notes = require('./routes/notes')
const Note = require('./models/Notes')
const flash = require('connect-flash')

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    defaultLayout:'main',
    extname:'.hbs',

    helpers:{
        loud: function (aString) {
            return aString.toUpperCase()
        },
        list: function(value, options) {
            let out = "<ul>"

            value.forEach((element) => {
                out += "<li>"+ options.fn(element) +"</li>"
            })

        

            return out + "</ul>"
        }
    }
})

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
//settings

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')



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
//app.use(flash())

app.use((req, res, next) => {
    //res.locals.notaEliminada = req.flash('notaEliminada')
    next()
})

app.use('/test', test)
app.use('/notes', notes)



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