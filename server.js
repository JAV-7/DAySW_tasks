require('dotenv').config() //LOADS ENVIRONMENT VARIABLES FROM .env
const express = require('express') //REQUIRES EXPRESS LIBRARY
const app = express()
const mongoose = require('mongoose') //REQUIRES MONGOOSE LIBRARY

mongoose.connect(process.env.DATABASE_URL) //CONNECTS TO MONGODB DATABASE (see .env)
const db = mongoose.connection 

db.on('error', (error) => console.log('error')) //NOTIFIES IF THERES AN ERROR DURING MONGODB CONNECTION
db.once('open', () => console.log('Connected to User Database')) //RUNS ONCE

app.use(express.json()) //MIDDLEWARE, ACCEPTS JSON

const usersRouter = require('./routes/users') //ROUTES ALL USER INFORMATION
app.use('/users', usersRouter) //PASSES PATH TO APP
//ANYTHING THAT HAS THIS URL WILL BE ROUTED TO USERS DATABASE

app.listen(3000, () => console.log('Server Started')) //INIIALIZES APP ON PORT 3000 AND STARTS CONSOLE
