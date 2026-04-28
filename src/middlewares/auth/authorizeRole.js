const jwt = require("jsonwebtoken")

async function authorizeRole(req, res, next) {
    
    try {
        const user = req.user
    
        if(user.role !== "artist") {
            return res.status(403).json({ message: "Only Artists can make or update songs" })
        }

        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = authorizeRole