 const Nodemailer = require("../common.service") 

const UserService = require("./user.services")

//creating a jwt
const jwt = require('jsonwebtoken')

//multer code start
const multer = require('multer')
const { response } = require("express")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')   //multer code end



exports.sandesh = function(req, res){
  UserService.createUser(req.body).then(function(result){
    res.send({
      message:`User Created ${result}`
    })
    Nodemailer.mailer(result)
    console.log(result)
  }, function(error){
      if(error){
        res.status(409).send({
          message:"User already exists"
        })
      }
      else  
        res.status(500).send()
  })
}

exports.login = function(req,res){
  UserService.findUser(req.body).then(function(result){
   
    var payload = {
      email:req.body.email.toLowerCase()
    }
    var token = jwt.sign(payload,"mysecretkey")
    console.log(token)
    res.setHeader("Authorization", token)
    res.send({
      message:"Login Success",
      res:result
    })
  }, function(error){
    if(error){
      res.status(500).send({
        message:"Invalid Credentials"
      })
    }
    else{
      res.status(500).send()
    }
  })
}

exports.deleteAccount = function(req,res){
  UserService.deleteUser(req.body).then(function(){})
}

exports.forgot = function(req,res){
  UserService.forgotPassword(req.body).then(function(result){
    
    res.send({
      message:"user validated"
    })
    //console.log("Result from db..",result)
    Nodemailer.mailer(result)
  }, function(error){
    if(error){
      res.status(500).send({
        message:"Invalid Credentials"
      })
    }
    else{
      res.status(500).send()
    }
  })
}


exports.recoverPassword = (req,res)=>{
  UserService.recoverPassword(req.body)
  .once("NOT_FOUND", function(){
      res.status(500).send({
          message:"No Such Email Exists"
      })
  })
  .once("Found", function(result){
    console.log("//////////////" , result)

      Nodemailer.mailer(result).then(()=>{
          res.send({
              message:"Password Sent to your Email"
          })
      }).catch((error)=>{
        console.log("Error from sending mail" , error)
          res.status(500).send()
      })
  })
  .once("ERROR", ()=>{
      res.status(500).send()
  })
}

exports.search = (req,res)=>{
  
  UserService.searchUser(req.query).then((result)=>{
    
    res.send({
      users:result
    })
  }).catch(function(){
    res.status(500).send()
  })
}

exports.uploadImage = (req,res)=>{
  upload(req,res,(err)=>{
    if(err)
      res.setStatus(500)
    res.send(req.file)
  });
}

exports.addBook = (req,res)=>{
  UserService.createBook(req.body).then(function(result){
    res.send({
      message:`Book Added ${result}`
    })
    console.log("Result of adding book", result)
  }, function(error){
    if(error){
      console.log(error)
      res.status(409).send({
        message:"Book already exists"
      })
    }
    else  
      res.status(500).send()
  })
}

exports.updateProfile = (req,res)=>{
   UserService.updateUser(req.body, function(err, result){
    if(result){
      console.log("I am updated", result)
      res.send({update:result})
    }
    else{
      console.log("Error", err)
    }
   })
}


