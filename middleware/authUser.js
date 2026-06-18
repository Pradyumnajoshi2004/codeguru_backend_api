// middleware/authUser.js
const jwt = require("jsonwebtoken");

exports.user = async (req, res, next) => {
    try {
        // ✅ Use the already verified user from auth middleware
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                errors: true,
                message: "User not authenticated"
            });
        }
        
        // ✅ Check if user has 'user' or 'admin' role
        if (user.role !== 'user' && user.role !== 'admin') {
            return res.status(403).json({
                errors: true,
                message: "User is not authorized"
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            errors: true,
            message: error.message
        });
    }
};