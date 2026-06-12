const jwt = require("jsonwebtoken")

exports.admin = async (req,res,next) => {
    try {
        const token = req.header("token")
        const data = await jwt.decode(token)
        console.log(data);
        req.user = data
        if (req.user.role != 'admin') return res.status(500).json({errors:true,message:"User Is Not Authorized"})
        next()
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}