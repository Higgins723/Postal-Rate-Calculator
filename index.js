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

app.post('/form', urlencodedParser, (req, res) => res.render('pages/db', {weight: req.body.weight, mail: req.body.mail, calcRate: calcRate(req.body.weight, req.body.mail)}))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calcRate(weight, type) {
    if (type === "Letters (Stamped)") {
        if (weight >= 1 && weight <= 4) {
            var baseRate = 0.50
            if (weight == 1) {
                return `$${baseRate}`
            }
            else {
                baseRate = baseRate + (0.21 * (weight - 1))
                return `$${baseRate.toFixed(2)}`
            }
        }
        return `Weight not supported for ${type}. Accepted weight range is 1-4.`
    }
    if (type === "Letters (Metered)") {
        if (weight >= 1 && weight <= 4) {
            var baseRate = 0.47
            if (weight == 1) {
                return `$${baseRate}`
            }
            else {
                baseRate = baseRate + (0.21 * (weight - 1))
                return `$${baseRate.toFixed(2)}`
            }
        }
        return `Weight not supported for ${type}. Accepted weight range is 1-4.`
    }
    if (type === "Large Envelopes (Flats)") {
        var baseRate = 1.00
        if (weight == 1) {
            return `$${baseRate}`
        }
        else {
            baseRate = baseRate + (0.21 * (weight - 1))
            return `$${baseRate.toFixed(2)}`
        }
    }
    if (type === "First-Class Package Service—Retail") {
        var baseRate = 3.50
        if (weight == 1 || weight == 2 || weight == 3 || weight == 4) {
            return `$${baseRate}`
        }
        if (weight == 5 || weight == 6 || weight == 7 || weight == 8) {
            baseRate = 3.75
            return `$${baseRate}`
        }
        if (weight == 9) {
            baseRate = 4.10
            return `$${baseRate}`
        }
        if (weight == 10){
            baseRate = 4.45
            return `$${baseRate}`
        }
        if (weight == 11) {
            baseRate = 4.80
            return `$${baseRate}`
        }
        if (weight == 12) {
            baseRate = 5.15
            return `$${baseRate}`
        }
        if (weight == 13) {
            baseRate = 5.50
            return `$${baseRate}`
        }
    }
}