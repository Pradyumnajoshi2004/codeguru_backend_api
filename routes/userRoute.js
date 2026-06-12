const { getUsers, postUser, putUser, deleteUser, login } = require("../controller/userController")

const route = require("express").Router()


route.get("/",getUsers)

route.post("/",postUser)

route.put("/:id",putUser)

route.delete("/:id",deleteUser)

route.post("/login",login)

module.exports = route