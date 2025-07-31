const mongoose = require("mongoose");

const messageschema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },email:{
        type: String,
        required:true
    },message:{
        type: String,
        required:true
    },
    date:{
         type: Date,
         default: Date.now,
    }
})

module.exports = mongoose.model("message", messageschema);
