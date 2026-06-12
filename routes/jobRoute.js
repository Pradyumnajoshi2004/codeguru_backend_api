const { getJob, jobFindById, postJob, putJob, deleteJob } = require("../controller/jobController")
const route = require("express").Router()
const {auth} = require("../middleware/auth")
const {user} = require("../middleware/authUser")
const {admin} = require("../middleware/authAdmin")

route.get("/",getJob)

route.get("/:id",jobFindById)

route.post("/",[auth,user],postJob)

route.put("/:id",[auth,user],putJob)

route.delete("/:id",[auth,user],deleteJob)

module.exports = route