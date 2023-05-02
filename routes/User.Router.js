
const express=require('express');
const userRouter=express.Router();
const UserModel=require("../models/User.Model")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { URLSearchParams } = require('url');

userRouter.post("/register",async(req,res)=>{
   try {
    let {email,password,name,gender}=req.body;
    bcrypt.hash(password, 5,async function(err, hash) {
        
        const user = new UserModel({name,email,password:hash,gender})
        await user.save()
        res.status(200).send("new user added successfully")
    });
   } catch (error) {
    res.status(400).send(error)
   }
})
//login
userRouter.post("/login",async(req,res)=>{
    try {
     let {email,password}=req.body;
     const user=await UserModel.findOne({email})
     console.log(user)
     if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ authorID:user._id }, 'eval')
                res.send({"msg":"Login Successfull !!",token})
            }else{

                res.status(200).send({"err":"Wrong password"})
            }
        });
     }else{
        res.status(404).send({"err":"Wrong Credentials!!"})
     }
     
    } catch (error) {
     res.status(400).send(error)
    }
 })
 module.exports=userRouter