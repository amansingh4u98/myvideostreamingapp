const Express = require("express")    //old way of getting express package

//import Express from "express"   // ES 6

const Mongoose = require("mongoose")
const dburl = "mongodb://localhost:27017/brilliodb"


const server = Express()
const port = 5050
const path = require("path")
const cors = require("cors")
const fs = require("fs")

const corsOptions ={

  exposedHeaders:"Authorization",

}

server.use(Express.json())   //middleware
server.use(cors(corsOptions))
server.use(Express.static(path.resolve(__dirname,"./build")))  //middleware

server.use('/user',require("./user"))
server.use('/book',require('./user'))
server.use('/video',require('./video'))

server.listen(port, function(){
  Mongoose.connect(dburl,function(error,client){
    if(error)
      console.log("Error connecting to database", error)
    else{
        console.log("Connected to database")
    }
  })
  console.log("Server is listening on port...", port)
})




