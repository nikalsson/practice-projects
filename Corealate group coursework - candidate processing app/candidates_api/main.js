// app init
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')
const {clearTempFiles} = require('./src/serverMaintance.js')
const {
    candidateRouting,
    choiceRouting
} = require('./routing')

// extensions
app.use(bodyParser.json())
app.use(cors())

//routes
candidateRouting(app)
choiceRouting(app)

setInterval(clearTempFiles,1000*60)

//app start
app.listen(port, () => {
    console.log("App running on port", port)
})