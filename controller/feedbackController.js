const Feedback = require("../model/feedback")

exports.getFeedback = async (req,res) => {
    try {
        const data = await Feedback.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
    
}

exports.postFeedback = async (req,res) => {
    try {
        const data = await Feedback.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}


exports.deleteFeedback = async (req,res) => {
    try {
        const data = await Feedback.findByIdAndDelete(req.params.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}