const jwt = require("jsonwebtoken")
const musicModel = require("../../models/musicModel.js")
const userModel = require("../../models/userModel.js")

async function verifyArtist(req, res, next) {
    
    try {
        
        const user = req.user
        const { songID } = req.params 

        const song = await musicModel.findById(songID)

        if(!song) {
            return res.status(404).json({ message: "Song not found" });
        } 

        if (!song.artistID.equals(user.id)) {
            return res.status(401).json({ message: "Unauthorized Artist" })
        }

        req.song = song

        next();

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = verifyArtist