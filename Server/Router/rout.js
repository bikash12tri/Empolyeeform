const express = require("express");
const router = express.Router();
const UserModel = require("../Model/emplyee");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let reqBody = req.body;
    let { Fname, Lname, email, phone, address,conphone } = reqBody;
    let user = await UserModel.create(reqBody);
    res.status(200).send({ message: "sucessfully created", data: user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let reqBody = req.body;
    let { email, phone } = reqBody;

    if (!email || !phone)
      return res.status(400).send({ msg: "Enter email and phome" });
    let user = await UserModel.findOne({ email, phone });
    
    if (!user)
      return res.status(401).send({
        msg: "Invalid login credentials. Please check the details & try again",
      });

      let userId = user._id
      // create token
      let token = jwt.sign(
          {
              userId: user._id.toString(),
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
          },
          'prakash123'
      )

      res.status(200).send({ status: true, message: 'Successfully Login', userId: { userId, token } });

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
