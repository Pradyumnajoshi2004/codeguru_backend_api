const { getFeedback, deleteFeedback ,postFeedback } = require("../controller/feedbackController")
const {auth} = require("../middleware/auth")
const {user} = require("../middleware/authUser")
const {admin} = require("../middleware/authAdmin")

const route = require("express").Router()

route.get("/",auth,getFeedback)

route.post("/",[auth,user],postFeedback)

route.delete("/:id",[auth,user,admin],deleteFeedback)

module.exports = route



