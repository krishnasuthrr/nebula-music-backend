const express = require("express");
const authController = require("../controllers/authControllers.js") 

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)

module.exports = authRouter;