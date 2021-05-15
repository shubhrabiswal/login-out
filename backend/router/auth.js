const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/connection");
const User = require("../model/user");
const authenticate = require("../middleware/authenticate")

router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword, role } = req.body;
  if (!name || !email || !phone|| !work || !password || !cpassword || !role) {    ///!phone
    console.log(req.body);
    return res.status(422).json({ err: "plz filled properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log(userExist);
      return res.status(422).json({ error: "Email already Exist" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
      role
    });
    /// pre save password hashing in user schema
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "user register successfully" });
    } else {
      res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(422).json({ err: "plz fill data properly" });
    }
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      
      token = await userlogin.generateAuthToken();
      console.log(token);  

      res.cookie("jwtoken", token, {
      // res.cookie( token, {
        expires: new Date(Date.now() + 25892000000), ///token exp in  1 month
        httpOnly:true
      });

      console.log("res.cookie",token);

      if(!isMatch){
        res.status(400).json({error: "Invalid credentials : password "});
      }else{
        res.json({message:"signin successful"});
      }
    }else{
        res.status(400).json({error:"Invalid Credentials : email"});
      
    }
    
     
  } catch (err) {
    console.log(err);
  }
});

router.post("/loginadmin", async (req, res) => {
  try {
    let token;
    const { email, password} = req.body;
    console.log(email);
    console.log(password);
    // console.log(role);
    if (!email || !password) {
      return res.status(422).json({ err: "plz fill data properly" });
    }
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {

      const isMatch = await bcrypt.compare(password, userlogin.password);
      if(userlogin.role === "doctor"){
        token = await userlogin.generateAuthToken();
        console.log(token);  

        res.cookie("jwtoken", token, {
          // res.cookie( token, {
          expires: new Date(Date.now() + 25892000000), ///token exp in  1 month
          httpOnly:true
        });

        console.log("res.cookie",token);
      }else{
        res.status(400).json({error: "Invalid role"});
        alert("Only admin login allowed");
      }
      

      if(!isMatch){
        res.status(400).json({error: "Invalid credentials : password "});
      }else{
        res.json({message:"signin successful"});
      }
    }else{
        res.status(400).json({error:"Invalid Credentials : email"});
      
    }
    
     
  } catch (err) {
    console.log(err);
  }
});


// authenticate.Authenticate
router.get("/about",authenticate.Authenticate, (req,res) => {
  console.log(req)
  console.log("token",req.token);
  console.log("about page details")
  res.status(200).send(req.rootUser);      
});

module.exports = router;
  