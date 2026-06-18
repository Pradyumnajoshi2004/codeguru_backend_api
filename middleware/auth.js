// middleware/auth.js
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        // ✅ Get token from header (supports both formats)
        const token = req.header("token") || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({
                errors: true,
                message: "The Token Is Not Found"
            });
        }
        
        // ✅ Verify the token
        const verifyToken = jwt.verify(token, process.env.SEC || 'your-secret-key');
        
        if (!verifyToken) {
            return res.status(401).json({
                errors: true,
                message: "The Token Is Not Valid"
            });
        }
        
        // ✅ Ensure _id is a string
        const userId = verifyToken._id ? verifyToken._id.toString() : null;
        
        // ✅ Attach user to request
        req.user = { 
            ...verifyToken,
            _id: userId,
            role: verifyToken.role || 'user',
            
        };
        console.log(req.user);
        
        next();
    } catch (error) {
        return res.status(500).json({
            errors: true,
            message: error.message
        });
    }
};