const musicModel = require("../models/musicModel.js")
const userModel = require("../models/userModel.js")
const { imageKitClient } = require("../services/storageService.js");
const jwt = require("jsonwebtoken")

async function createMusic(req, res) {
    
    try {

        const token = req.cookies.token
        const file = req.file

        if(!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Only Artists can crate Music" })
        }

        const song = await imageKitClient.files.upload({
            file: file.buffer.toString("base64"), // contents of file converted in buffer format, then into string
            fileName: req.body.songTitle + "-" + Date.now(),
            folder: "/songs/" 
        })

        if(song) {
            const uploadSong = await musicModel.create({
                url: song.url,
                title: song.name,
                artist: decoded.id
            })

            return res.status(201).json({
              message: "Song created succesfully",
              url: uploadSong.url
            });
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Some Error occurred" })
    }

}


async function searchSong(req, res) {
    
    try {

        const token = req.cookies.token
        const { artistName, songTitle } = req.query

        if(!artistName && !songTitle) {
            return res.status(400).json({ message: "Invalid Queries" })
        }

        if(!token) {
            return res.status(401).json({ message: "Unauthorized User, Kindly Sign in or Register" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const artists = await userModel.find({ 
            username: { $regex: artistName, $options: "i" },
            role: "artist" 
        })

        if(artists.length < 1) {
            return res.status(400).json({ message: "No Artists found" })
        }

        const songs = await musicModel.find({
          $or: [
            {
              artist: artists.map(artist => artist._id),
            },
            { title: songTitle },
          ],
        });

        console.log(songs)

        if(songs.length < 1) {
            return res.status(404).json({ message: "No songs found" })
        }

        return res.status(200).json({
            message: "Songs Found",
            songs: songs.map((song) => song.url)
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

module.exports = { createMusic, searchSong }