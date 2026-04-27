const express = require("express")
const musicController = require("../controllers/musicControllers.js")
const { upload } = require("../services/storageService.js");

const musicRouter = express.Router()

musicRouter.post("/create-music", upload.single("song"), musicController.createMusic) // song = key containing the incoming file

musicRouter.post("/search-song", musicController.searchSong)

module.exports = musicRouter;