const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const Todo = Schema({
    title: {type:String, required:true},
    assignee: {type:String, required:true},
    status: {type:Boolean, required:true},
})

module.exports = mongoose.model('Todo', Todo)