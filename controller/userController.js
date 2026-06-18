const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../model/user")

exports.getUsers = async (req,res) => {
    try {
        const data = await User.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.postUser = async (req,res) => {
    try {
        const isUserExists = await User.findOne({email:req.body.email})
        if(isUserExists) return res.status(500).json({errors:true,message:"The User Already Exists"})
        
        req.body.password = await bcrypt.hash(req.body.password,10)
        const data = await User.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.putUser = async (req,res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.login = async (req,res) => {
    try {
        const userExists = await User.findOne({email:req.body.email})
        if(!userExists) return res.status(500).json({errors:true,message:"The User Not Exists"})
        
            const comparePassword = await bcrypt.compare(req.body.password , userExists.password)
        if(!comparePassword) return res.status(500).json({errors:true,message:"The Email And Password Is Invaild"})
        
        const token = await jwt.sign({_id:userExists._id.toString() , role:userExists.role},process.env.SEC)
        return res.json({errors:false,data:{token:token,user:userExists}})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
    
}