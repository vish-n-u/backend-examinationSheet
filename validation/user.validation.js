const User = require("../model/user.model")
exports.isAdmin = async(req,res,next)=>{
    if(req.user.userType === 'admin' && req.user.authorized){
        next()}
    else{
        return res.status(400).send({message:"Unauthorized"})
    }
}

exports.authenticateUserByObjectId = async(req,res,next)=>{
    const id = req.params.id
    if(!id) return res.status(400).send({message:"invalid id"})
    let unauthorizedUser = await User.findById(id)
    if(!unauthorizedUser) return es.status(400).send({message:"invalid id"})
    else{
req.unauthorizedUser = unauthorizedUser 
next()
        }
}


exports.isTeacher =(req,res,next)=>{
    if(req.user.userType=="teacher"&&req.user.authorized) next()
    else return res.status(400).send({message:"not authorized"})
}