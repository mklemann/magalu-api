const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const loginRoute = require('./_shared/login/login.route')
const custumerRoutes = require('./customers/customers.routes')
const userRoutes = require('./users/user.routes')

require('dotenv').config()
const app = express()


app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use(custumerRoutes)
app.use(userRoutes)
app.use(loginRoute)

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000')
})