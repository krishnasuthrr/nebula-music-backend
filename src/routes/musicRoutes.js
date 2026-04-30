const express = require("express")
const musicController = require("../controllers/musicControllers.js")
const authenticateUser = require("../middlewares/auth/userAuthToken.js")
const authorizeArtist = require("../middlewares/auth/authorizeRole.js");
const verifyArtist = require("../middlewares/auth/verifyArtist.js")
const { upload } = require("../services/storageService.js");

const musicRouter = express.Router()

musicRouter.post(
  "/create-music",
  authenticateUser,
  authorizeArtist,
  upload.single("song"),
  musicController.createMusic,
);

musicRouter.post(
  "/search-song",
  authenticateUser,
  musicController.searchSong,
);

musicRouter.post(
  "/update-song/:songID",
  authenticateUser,
  authorizeArtist,
  verifyArtist,
  musicController.updateSong,
);

musicRouter.post(
  "/delete-song/:songID",
  authenticateUser,
  authorizeArtist,
  verifyArtist,
  musicController.deleteSong
)

module.exports = musicRouter;