
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()



// const employeeRoute = require('./routes/employeeRoute')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/employee', employeeRoute)


mongoose.connect(process.env.MONGODB_URL, {


})
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
