const Mongoose = require("mongoose")

const VideoSchema = new Mongoose.Schema({
    url:{type:String, unique:true,required:true},
    coverimage:{type:String},
    thumbnail:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    verified:{type:Boolean,default:false},
    genre:{type:[String]},
    yearofrelease:{type:Date},
    creationdate:{type:Date,default:new Date()},
    languages:{type:[String]},
    videoid:{type:Number,unique:true,required:true},
    rating:{type:Number,default:9},
    description:{type:String},
    owner:{type:String,required:true},
    cast:{type:[String]}
})

const VideoModel = Mongoose.model("videos", VideoSchema)

module.exports = VideoModel