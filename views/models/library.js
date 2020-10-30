const mongoose = require("mongoose")
const librarySchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: String,
    price: {type: Number, required: true},
    genre: {type: String, required: true}
},
{timestamps: true})
const Books = mongoose.model("Books", librarySchema)
module.exports = Books