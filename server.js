const express = require('express')
const bodyParser = require('body-parser')
const todoRouter = require('./routes/todo-route')
const { default: mongoose } = require('mongoose')
let dotenv = require('dotenv').config()

const app = express()

app.use(bodyParser())


app.use('/api', todoRouter)

app.use('/', async (req, res) =>{
    return res.status(404).json({message:"Error page not Found 404"})
})


mongoose.connect(process.env.MONGOPATH).then(()=>{
    console.log("Connect to Database...")
    app.listen(5000)
    console.log("listening in port 5000")
}).catch((err)=>{
    console.log(err.message)
})