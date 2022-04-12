const mongoose = require('mongoose');
const {nanoid} = require('nanoid')

const shortUrlSchema = new mongoose.Schema({
    id:{
        type: String,
        required:true,
        default: nanoid(10)
    },
    full:{
        type: String,
        required: true,
    },
    short: {
        type:String,
        required: true,
        default: nanoid(10)
    },
})

module.exports = mongoose.model("ShortUrl", shortUrlSchema);