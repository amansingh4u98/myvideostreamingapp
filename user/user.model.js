const Mongoose = require("mongoose")

// const UserSchema = new Mongoose.Schema({
//   email:{type:String,unique:true,required:true},
//   password:{type:String,required:true},
//   creationdate:{type:Date,default:new Date()},
//   verified:{type:Boolean,default:false},
//   phone:{
//     type:String,
//     validate:{
//       validator:function(v){
//         return /^([0-9]{10}$)/.test(v)
//       }
//     }
//   }
// })

//const UserModel = Mongoose.model("users", UserSchema)

const UserSchema=new Mongoose.Schema({
    name:{type:String},
    image:{type:String},
    profilecompleted:{type:Boolean,default:false},
    premiumuser:{type:Boolean,default:false},
    email:{type:String,unique:true,required:true,validate:{
        validator:function(email){
            var re= /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }},
    password:{type:String,required:true},
    creationdate:{type:Date,default:new Date()},
    verified:{type:Boolean,default:false},
    phone:{
        type:String,
        validate:{
            validator:function(v){
                return /^([0-9]{10}$)/.test(v);
            }
        }
    }
})
const UserModel=Mongoose.model("videousers",UserSchema);

// const BookSchema = new Mongoose.Schema({
//   bookName:{type:String,required:true},
//   bookGenre:{type:String,required:true},
//   bookDesc:{type:String,required:true, unique:true},
//   bookImg:{type:String},
//   creationdate:{type:Date,default:new Date()},
//   verified:{type:Boolean,default:false},
// }) 

//const BookModel = Mongoose.model("books", BookSchema)

module.exports = UserModel

//module.exports = BookModel