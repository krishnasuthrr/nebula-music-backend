const express = require("express")
const musicController = require("../controllers/musicControllers.js")
const authenticateUser = require("../middlewares/auth/userAuthToken.js")
const authorizeRole = require("../middlewares/auth/authorizeRole.js");
const { upload } = require("../services/storageService.js");

const musicRouter = express.Router()

musicRouter.post(
  "/create-music",
  authenticateUser,
  authorizeRole,
  upload.single("song"),
  musicController.createMusic,
);

musicRouter.post(
  "/search-song",
  authenticateUser,
  authorizeRole,
  musicController.searchSong,
);

musicRouter.post(
  "/update-song/:songID",
  authenticateUser,
  authorizeRole,
  musicController.updateSong,
);

module.exports = musicRouter;