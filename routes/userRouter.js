const express=require('express');
const routes=express.Router();
const { body,validationResult  } = require('express-validator');
const userModel=require('../UserModel/user')
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken')

routes.get('/register',(req,res)=>{
  res.render('register');
})

routes.post('/register',
  body('email').trim().isEmail().isLength({min:12}),
  body('password').trim().isLength({min:4}),
  body('userName').trim().isLength({min:4}),
  async (req,res)=>{
  
  const errors=validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({
      errors:errors.array(),
      message:'invalid data'
    })
  }
  else{   
  // res.send('data stored in data base');
  const {userName,email,password}=req.body;
    console.log(userName,email,password)
    const hashPassword= await bcrypt.hash(password,10)
     const newUser= await userModel.create({
     username: userName,
     email: email,
     password:  hashPassword
    })
    res.json(newUser)
   
  }

})

routes.get('/login',(req,res)=>{
  res.render('login');
})

routes.post('/login',
  body('password').trim().isLength({min:4}),
  body('userName').trim().isLength({min:4}),
  async (req,res)=>{

  const errors=validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({
      errors:errors.array(),
      message:'invalid data'
    })
  }else{
   const {userName,password}=req.body;
   const data=await userModel.findOne({username:userName});
   if(data){
      console.log(data)
      const isMatch=await bcrypt.compare(password,data.password);
      if(!isMatch){
        res.json({
          message:'the data is not found'
        })
      }
      const token=jwt.sign({
        id:data._id,
        userName:data.username,
        email:data.email,
      },process.env.JWT_SECRETE_KEY)

      res.cookie('token',token)
      res.send('Login Done')
   }
   else{
    res.json({
      message:'the userName or possword is incorrect'
    })
   }
  }
})

module.exports=routes;