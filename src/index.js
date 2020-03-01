const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

const custumerRoutes = require('./customers/customers.routes')
const env = require('./environment')

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(custumerRoutes)

app.listen(env.port, () => {
    console.log('listening on port 3000')
})