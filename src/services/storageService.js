const { ImageKit } = require("@imagekit/nodejs")
const multer = require("multer") // file handling

const upload = multer({ storage: multer.memoryStorage() }) // store buffer files in RAM, efficient than disk storage

const imageKitClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

module.exports = { upload, imageKitClient }