const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");
const musicRouter = require("./routes/musicRoutes.js")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/music", musicRouter);

module.exports = app;