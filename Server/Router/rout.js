const express = require("express");
const router = express.Router();
const UserModel = require("../Model/emplyee");
const jwt = require("jsonwebtoken");

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

module.exports = router;