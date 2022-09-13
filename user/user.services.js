const UserModel = require("./user.model")
const BookModel = require("./user.model")
const EventEmitter = require('events')
const { resolve } = require("path")

exports.createUser = function(data){

  return new Promise(function(resolve,reject){
    console.log("Before saving to db...",data)
    data.email = data.email.toLowerCase()
      var userdata = UserModel(data)
      userdata.save().then(function(result){
        console.log("Result of mongodb operation", result)
        resolve(result)

      }, function(error){
          console.log("Error in saving data",error)
          if(error.code === 11000)
            reject(error)
          else
            reject()
      })
  })
}


exports.findUser = function(data){
  var queryObj = {
    email : data.email.toLowerCase(),
    password : data.password
  }
  return new Promise(function(resolve,reject){
  
  UserModel.findOne(queryObj).then(function(result){
    console.log("Finding user from db", result)
    if(result){
      resolve(result)
    }
    else
      reject("Invalid Credentials")
  }).catch(function(error){
    reject()
    console.log("Error in finding user from db",error)
  })
})
}

exports.deleteUser = function(data){
  return new Promise(function(resolve,reject){
    
  })
}

exports.forgotPassword = function(data){
  var queryObj = {
    email : data.email.toLowerCase()
  }

  return new Promise(function(resolve,reject){
    UserModel.findOne(queryObj).then(function(result){
    console.log("Finding user from db", result)
    if(result){
      
      resolve(result)
    }
    else
      reject("Invalid Credentials")
  }).catch(function(error){
    console.log("Error in finding user from db",error)
    reject()
    
  })
  })
}

exports.recoverPassword = (data)=>{
  let emitter = new EventEmitter()
  var queryObj = {email:data.email.toLowerCase()}
  console.log("Here we are finding password of user", data)
  
  UserModel.findOne(queryObj).then((result)=>{
      console.log("result of db operation", result)
      if(result){
          return emitter.emit("Found" , result)
      }
      else{
          return emitter.emit("NOT_FOUND")
      }
  }).catch((error)=>{
      return emitter.emit("ERROR", error)
  })

  return emitter
}

exports.searchUser = (data)=>{
  
  var query = {"email":{"$regex":data.q,"$options":"i"}}
    return new Promise(function(resolve,reject){
      UserModel.find(query).then((result)=>{
        if(result)
        {
          console.log("Result",result)
          resolve(result)
        }
        else  
          reject()
      }).catch((error)=>{
          reject()
      })
    })
  }

  exports.createBook = function(data){

    return new Promise(function(resolve,reject){
      console.log("Before saving to db...",data)
        var bookdata = BookModel(data)
        bookdata.save().then(function(result){
          console.log("Result of mongodb operation", result)
          resolve(result)
  
        }, function(error){
            console.log("Error in saving data",error)
            if(error.code === 11000)
              reject(error)
            else
              reject()
        })
    })
  }

  exports.updateUser = (data, cb)=>{
    console.log(data)
    var queryObj={
      email:data.email 
    }
    var updateobj = {
      "$set" : {
        image: data.image,
        name: data.name,
        profilecompleted: true
      }
    }
    console.log("email", data, queryObj.email)
    UserModel.findOneAndUpdate(queryObj, updateobj).then((result) =>{
        console.log("update user from db", result)
        cb(null, result)
    }).catch((err)=>{
        console.log("we have err" , err)
        cb(err, null)
    })
  }
