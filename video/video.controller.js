const VideoService = require('./video.service')

exports.addVideo = (req,res)=>{
  VideoService.createVideo(req.body).then((result)=>{
    res.send({
      message:`Video Added ${result}`
    })
    console.log(result)

  }, (error)=>{
    if(error){
      res.status(409).send({
        message:"Video already exists"
      })
    }
    else  
      res.status(500).send()
  })
}

exports.getVideos = (req,res)=>{
  VideoService.getVideosData(req.body).then((result)=>{
    res.send({
      message:`Videos fetched ${result}`
    })
  }, (error)=>{
    if(error)
      res.status(500).send()
  })
}