require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const sequelize = require('./config/database')
const schoolRoute = require('./routes/schoolRoute')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', schoolRoute)

sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('app is connected to database')
            console.log('server is running on port 3000')
        })
    })
    .catch((err) => {
        console.error('error connecting to database:', err)
    })