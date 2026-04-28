const jwt = require("jsonwebtoken")

async function authenticateUser(req, res, next) {
    
    try {

        const token = req.cookies.token

        if(!token){
            return res.status(401).json({ message: "Unauthorized User, Kindly Login or Register" });
        } 
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded // create a new property storing the token

        next();

    } catch (error) {
        console.error(error)
        
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" })
        }

        return res.status(401).json({ message: "Invalid Token" })
    }
    
}

module.exports = authenticateUser