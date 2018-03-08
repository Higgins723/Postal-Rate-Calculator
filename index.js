const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: true})
const PORT = process.env.PORT || 5000

var app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))

app.post('/form', urlencodedParser, (req, res) => res.render('pages/db', {weight: req.body.weight, mail: req.body.mail}))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index', {
//     drink: "Pepsi"
//   }))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
