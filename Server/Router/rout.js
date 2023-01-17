const express = require("express");
const router = express.Router();
const UserModel = require("../Model/emplyee");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const fs =require("fs")

router.post("/register", async (req, res) => {
  try {
    let reqBody = req.body;
    let { Fname, Lname, email, phone, address, password } = reqBody;
    let user = await UserModel.create(reqBody);
    res.status(200).send({ message: "Data created sucessfully", data: user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let reqBody = req.body;
    let { email, password } = reqBody;

    if (!email || !password)
      return res.status(400).send({ msg: "Enter email and password" });
    let user = await UserModel.findOne({ email: email, password: password });

    if (!user) {
      return res.status(404).send({ message: "email or password is incorrect"});
    }

    let userId = user._id;
    // create token
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "Bikash123"
    );

    res.status(200).send({
      status: true,
      message: "Loggedin successfully",
      userId: { userId, token },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Renew Token

const renew_token = async(id)=>{
  try{
     const secret_jwt = config.secret_jwt;
     const newSecretJwt = randomstring.generate();

     fs.readFile('config/config.js','utf-8',function(err,data){
        if(err) throw err;

        var newValue = data.replace(new RegExp(secret_jwt,"g"),newSecretJwt);

        fs.writeFile('config/config.js',newValue,'utf-8',function(err,data){
          if(err) throw err;
          console.log('Done!');
        });
     });

     const token = await jwt.sign({_id:id},config.secret_jwt);
     return token;

  } catch(error){
    res.status(200).send({success:false,msg:"User not found"});
  }
}

//Refresh token

router.post("/refresh-token",async(req,res)=>{

  try{
    const user_id = req.body.user_id;
    const userData = await User.findById({_id: user_id});
    if(userData) {
        const tokenData = await User.renew_token(user_id);
        const response = {
          user_id:user_id,
          token:tokenData
        }
        res.status(200).send({success:false,msg:"Refresh Token details",data:response});
    }
    else {
      res.status(200).send({success:false,msg:"User not found"});
    }


  }catch(error) {
    res.status(500).send(error);
  }
})

module.exports = {router,renew_token}