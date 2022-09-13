const Express = require("express")
const UserController = require("./user.controller")
const router = Express.Router()
const jwt = require("jsonwebtoken")

router.post("/register", UserController.sandesh)

router.post("/login", UserController.login)

router.delete("/deleteaccount", function(req,res,next){
  var token = req.get("Authorization")
  console.log("Token:", token)
  try{
  var payload = jwt.verify(token,"mysecretkey")
  console.log("Payload", payload)
  }catch{
    console.log("Token is Invalid")
    res.status(401).send()
  }
  if(payload){
    req.body.email = payload.email
    next()
  }

} ,UserController.deleteAccount)

//router.post("/forgot", UserController.forgot)
router.post("/forgot", UserController.recoverPassword)

router.get("/search", UserController.search)

router.post("/upload", UserController.uploadImage)

router.put("/updateProfile", (req,res,next)=>{
  var token = req.get("Authorization")
  console.log("Token:", token)
  try{
  var payload = jwt.verify(token,"mysecretkey")
  console.log("Payload", payload)
  }catch{
    console.log("Token is Invalid")
    res.status(401).send()
  }
  if(payload){
    req.body.email = payload.email
    next()
  }
}, UserController.updateProfile)

router.post("/addBook", UserController.addBook)

router.get("/getLoginStatus", (req,res)=>{
  var token = req.get("Authorization")
  console.log("Token:", token)
  try{
  var payload = jwt.verify(token,"mysecretkey")
  //console.log("Payload", payload)
    if(payload)
      {
        res.send({
          message:"Login is successful"
        })
      }
  }catch{
    console.log("Token is Invalid")
    res.status(401).send()
  }
})

module.exports = router

