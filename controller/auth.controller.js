const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/server.config");

const User = require("../model/user.model");

exports.registration = async (req, res) => {
  console.log("registration", req.user, secretKey);
  try {
    
    const obj = {
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
      userType :req.body.userType
    };
    const newUser = await User.create(obj);

    let token = jwt.sign({ email: newUser.email }, secretKey);
    
    return res.status(201).send({
      message: {
        userName: newUser.userName,
        token,
        email: newUser.email,
        userType:newUser.userType,
        authorized: newUser.authorized,
        _id: newUser._id
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};


exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign({ email: req.doesUserExist.email }, secretKey);
    
    console.log(req.doesUserExist);
    return res.status(200).send({
      message: {
        userName: req.doesUserExist.userName,
        token,
        email:req.doesUserExist.email,
        userType:req.doesUserExist.userType,
        authorized:req.doesUserExist.authorized,
        _id: req.doesUserExist._id
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};


exports.adminAutherize = async(req,res)=>{
  try {

    let user = await User.findById(req.body.userId)
    let token = jwt.sign({ email: user.email }, secretKey);
    
    console.log(user);
    return res.status(200).send({
      message: {
        userName: user.userName,
        token,
        email:user.email,
        userType:user.userType,
        authorized:user.authorized,
        _id: user._id
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }

}