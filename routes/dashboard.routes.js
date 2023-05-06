const {Router} = require("express")
require("dotenv").config()
const {CityModel} = require("../models/City.model"); 
const dashboardController = Router();
const {decryptToken }= require("../utils/utils");
const {UserModel} = require("../models/User.model")
 
dashboardController.post("/create-city", async (req, res) => {
    const {cityName,cityDescription,profileImgUrl,latitude,longitude,cityState, population} = req.body; 

    const city = new CityModel({
        cityName,
        cityDescription,
        profileImgUrl,
        latitude,
        longitude,
        cityState,
        population
    })
    
    try{
        await city.save()
        res.status(200).send("City created")
    }
    catch(err){
        res.status(400).send("something went wrong while creating course" )
    }
});

dashboardController.get("/cities", async (req, res) => {
   
    if(!req.headers.authorization){
        return res.status(401).send("Please login again")
    }
    const token = req.headers.authorization.split(" ")[1]
    const userToken=decryptToken(token);

    const email= userToken.email || "email"

    const cities = await CityModel.find({});

    const user = await UserModel.find({email:email});
    console.log(user)
     
    if(!user[0]){
        return res.status(404).send("User doesn't exists.")
    }else{
        return res.status(200).json({msg : "Cities retreived successfully",cities:cities})
    } 

});



module.exports = {
    dashboardController
}
