const feedbackRoute = require("./routes/feedbackRoute")
const jobRoute = require("./routes/jobRoute")
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose")
const express  = require("express")
const cors  = require("cors")

require("dotenv/config")

const app = express()
// middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{res.send("Home")})

app.use("/api/job",jobRoute)
app.use("/api/feedback",feedbackRoute)
app.use("/api/user",userRoute)

app.listen(process.env.PORT || 5000)

async function db() {
    try {
        const res = await mongoose.connect(process.env.DB)
        console.log(res.STATES.connected);
    } catch (error) {
        console.log(error.message);
        
    }
}

db()