const mongoose = require('mongoose');

const urlScheme = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    visit:[{timestamp:{type:Number}}]
},{timestamps:true})


const URL = mongoose.model('Url',urlScheme);

module.exports = URL;