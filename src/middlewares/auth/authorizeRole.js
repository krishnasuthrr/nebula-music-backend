const jwt = require("jsonwebtoken")

async function authorizeArtist(req, res, next) {
    
    try {
        const user = req.user
    
        if(user.role !== "artist") {
            return res.status(403).json({ message: "Only Artists can Make, Update, or Delete their songs" })
        }

        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = authorizeArtist