const router = require("express").Router();

const StatusController = require("../Controllers/StatusController");

router.post("/create", StatusController.create)
router.get("/getstatus", StatusController.get)
router.put("/update/:id", StatusController.update)

module.exports = router;