const mongoose = require("mongoose")

const musicSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artistID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    artistName: {
        type: String,
        required: true
    }
})

const musicModel = mongoose.model("music", musicSchema)

module.exports = musicModel