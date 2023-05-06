const {Router} = require("express")
const {UserModel} = require("../models/User.model")
const userController = Router();
const bcrypt = require("bcrypt"); 
require("dotenv").config();
const {validateEmail,generateToken }= require("../utils/utils");


userController.post("/signup", async(req, res) => {
    const {email,fullName, password} = req.body;

    const alreadyUser = await UserModel.find({ email });
    const valideMail= validateEmail(email);
    const role= "user"

    if(valideMail===false){
        return res.status(401).send("Invalid email address !");
    }
    else if (alreadyUser.length>0){
        return res.status(403).send("User already exists");
    }
    else{
        bcrypt.hash(password, 5, async function(err, hash) {
          if(err){
             res.status(400).send("Something wentwrong, plz try again later")
          }
          try{
            const user = new UserModel({
                email,
                fullName,
                password : hash
            })
             await user.save();
             const token = generateToken({
                email: user.email,
                fullName: user.fullName
              })
             res.status(200).json({msg : "Signup successful",token, email:user.email, fullName:user.fullName })
          }
          catch(err){ 
            console.log(err)
           res.status(400).send("Something went wrong, plz try again")
          }
         
      }); 
      }

});


userController.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const validEmail = validateEmail(email);
    if (validEmail) {
      const user = await UserModel.findOne({email: email });
      if (user) {
        const hash = user.password;
        if (user && hash) {
          const verification = await bcrypt.compare(password, hash);
          if (verification) {
            const token = generateToken({
              userId:user._id,
              email: user.email,
              fullName: user.fullName
            });
            res.status(200).send({
              msg: "Signed in successfully",
              email: user.email,
              fullName: user.fullName,
              token,
            });
          } else if (user && !verification)
            res.status(401).send({ msg: "Please enter a valid password." });
        }
      } else
        res.status(404).send({
          msg: "The account you mentioned does not exist. Please try with correct email address.",
        });
    } else res.status(401).send({ msg: "Please enter a valid email address." });
  });


module.exports = {
    userController
}
