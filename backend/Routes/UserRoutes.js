const router = require("express").Router();

const UserController = require("../Controllers/UserController");

router.post("/register", UserController.register)
router.get("/getuser", UserController.getUser)
router.get("/getallusers", UserController.getAllUsers )
router.put("/updateuser/:userId", UserController.updateUser)
router.delete("/deleteuser/:userId", UserController.deleteUser)

module.exports = router;
