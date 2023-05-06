const {Router} = require("express")
require("dotenv").config()
const {CityModel} = require("../models/City.model"); 
const mapController = Router();
const {decryptToken }= require("../utils/utils");
const {UserModel} = require("../models/User.model")
 
mapController.post("/view-map", async (req, res) => {
    const {cityId} = req.body; 

    if(!req.headers.authorization){
        return res.status(401).send("Please login again")
    }
    const token = req.headers.authorization.split(" ")[1]
    const userToken=decryptToken(token);

    const email= userToken.email || "email"

    const city = await CityModel.findOne({_id:cityId});

    const user = await UserModel.find({email:email}); 
     
    if(!user[0]){
        return res.status(404).send("User doesn't exists.")
    }
    else if(!city){
        return res.status(404).send("City not found.")
    }
    else{
        return res.status(200).json({msg : "City retreived successfully",city:city})
    } 

});

module.exports = {
    mapController
}
