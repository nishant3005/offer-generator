const router = require("express").Router();
const User = require('../models/userSchema');
require('dotenv').config();



router.post('/login',(req,res)=>{
    let {email}=req.body;
    User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              User.create({
                email: email,
              })
                .then(() =>
                  console.log(`${profile.displayName}'s account has been created`)
                )
                .catch((err) => {
                  consonle.log(
                    `error (while creating user): ${JSON.stringify(err)}`
                  );
                });
            }
            res.status(200).send("User logged in successfully")
          })
          .catch((err) =>{
            console.log(
              `Error occured while looking for user: ${JSON.stringify(err)}`
            )
            res.status(500).send("Something went wrong")
          }
          );
      
  })
  
  router.post('/',async(req,res)=>{
    try {
      const {email}=req.body;
      let user=await User.findOne({email});
      if(!user) {
        user=new User({email});
        await user.save();
      }
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:JSON.stringify(error)});
    }
  })
  

module.exports = router;