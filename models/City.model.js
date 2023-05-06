const mongoose = require("mongoose")
 
const citySchema = new mongoose.Schema({
    id : {type : Object}, 
    cityName:{type:String},
    cityState:{type:String},
    profileImgUrl:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    cityDescription:{type:String}
})

  
const CityModel = mongoose.model("city", citySchema)


module.exports = {
    CityModel
}