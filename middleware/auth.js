const jwt = require("jsonwebtoken")

exports.auth =  (req,res,next) => {
    try {
        const token = req.header("token") || req.header("Authorization")?.replace("Bearer ", "")
        if(!token) return res.status(401).json({errors:true,message:"The Token Is Not Found"})
        const verifyToken = jwt.verify(token , process.env.SEC)
        req.user  = verifyToken 
        if(!verifyToken) return res.status(401).json({errors:true,message:"The Token Is Not Valid "})
        next()
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}