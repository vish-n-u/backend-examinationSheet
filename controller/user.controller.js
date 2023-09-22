const User = require("../model/user.model");

exports.getUserDetail = (req,res)=>{
    try{
        let userDetail ={
            userName:req.userName,
            email:req.user.email,
            userType:req.user.userType,
            authorized:req.user.authorized
        }
        return res.status(200).send({message:userDetail});
    }
    catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}


exports.getAllUserDetail = async(req, res) =>{
    try{
        console.log("getAllUserDetail")
        let allUsers = await User.find()
      return  res.status(200).send({message:allUsers})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}

exports.authorizeUser = async(req,res)=>{
    try{
        req.unauthorizedUser.authorized = true
        await req.unauthorizedUser.save()
        return  res.status(200).send({message:"success"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}

exports.getAllStudents = async(req,res)=>{
    console.log("getAllStudents")
    try{
        let allUser = await User.find({userType:"student",authorized:true})
        console.log(allUser,"allUser")
        return res.status(200).send({message:allUser})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal Server Error"})
    }
}


