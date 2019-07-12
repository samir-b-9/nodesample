const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
        cityid: Number,
        cityname : String,
        stateid: Number
    });
 
module.exports = mongoose.model('City', CitySchema);