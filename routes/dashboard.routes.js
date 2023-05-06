const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {CityModel} = require("../models/City.model"); 
const dashboardController = Router();
 
dashboardController.post("/create-city", async (req, res) => {
    const {cityName,cityDescription,profileImgUrl,latitude,longitude,cityState} = req.body; 
    
    const city = new CityModel({
        cityName,
        cityDescription,
        profileImgUrl,
        latitude,
        longitude,
        cityState
    })
    try{
        await city.save()
        res.status(200).send("City created")
    }
    catch(err){
        res.status(400).send("something went wrong while creating course" )
    }
});



module.exports = {
    dashboardController
}
