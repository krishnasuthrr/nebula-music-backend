const musicModel = require("../models/musicModel.js")
const userModel = require("../models/userModel.js")
const { imageKitClient } = require("../services/storageService.js");
const jwt = require("jsonwebtoken")

async function createMusic(req, res) {
    
    try {

        const file = req.file
        const user = req.user

        const artist = await userModel.findById(user.id)

        const song = await imageKitClient.files.upload({
            file: file.buffer.toString("base64"), // contents of file converted in buffer format, then into string
            fileName: req.body.songTitle + "-" + Date.now(),
            folder: "/songs/" 
        })

        if(song) {
            const uploadSong = await musicModel.create({
                url: song.url,
                title: song.name,
                artistID: artist._id,
                artistName: artist.username
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

        const { artistName, songTitle } = req.query
        
        const userToken = req.user

        if(!artistName && !songTitle) {
            return res.status(400).json({ message: "Invalid Queries" })
        }

        const searchParameters = [];

        if(songTitle) searchParameters.push({
            title: { $regex: songTitle, $options: "i" }
        });

        if(artistName) searchParameters.push({ 
            artistName: { $regex: artistName, $options: "i"} 
        });

        const songs = await musicModel.find({
          $or: searchParameters
        });

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


async function updateSong(req, res) {
    
    try {
        
        const { title } = req.body
        const user = req.user
        const { songID } = req.params 

        const song = await musicModel.findById(songID)

        if(!song) {
            return res.status(404).json({ message: "Song not found" });
        } 

        const artist = await userModel.findById(user.id)

        if (!song.artistID.equals(user.id)) {
            return res.status(401).json({ message: "Unauthorized Artist" })
        }

        song.title = title; 

        const updatedSong = await song.save()

        return res.status(200).json({
            message: "Song Title updated successfully",
            newTitle: updatedSong.title
        })

    } catch (error) {
        console.error(error)
    }

}

module.exports = { createMusic, searchSong, updateSong }