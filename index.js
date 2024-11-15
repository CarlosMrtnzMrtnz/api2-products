const express = require('express')
const router = require('./routes/router')
const connectDB = require('./config/db')
const app = express()
require('dotenv').config()

app.use(express.json())
let PORT = process.env.PORT
http://localhost:3000/api
app.use('/api', router)
connectDB()
app.listen(PORT || 3000, ()=> {
    console.log(`Server running on port: ${PORT}`);
})