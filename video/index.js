const Express = require("express")
const VideoController = require("./video.controller")
const router = Express.Router()

router.post("/addVideo", VideoController.addVideo)

router.get("/getVideo", VideoController.getVideos)


module.exports = router