const VideoModel = require("./video.model")

exports.createVideo = function(data){
  return new Promise(function(resolve,reject){
    console.log("Before saving to db...",data)
    data.videoid = Math.floor(100000000 + Math.random() * 900000000)+Date.now()
      var videodata = VideoModel(data)
      videodata.save().then((result)=>{
        console.log("Result of mongodb operation", result)
        resolve(result)

      }, (error)=>{
        console.log("Error in saving data",error)
          if(error.code === 11000)
            reject(error)
          else
            reject()
      })
  })
}

exports.getVideosData = (data)=>{
    return new Promise ((resolve,reject)=>{
      
    })
}
