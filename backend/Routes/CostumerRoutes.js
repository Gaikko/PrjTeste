const router = require("express").Router();

const CostumerController = require("../Controllers/CostumerController");

router.post("/create", CostumerController.create);
router.get("/getallcostumer", CostumerController.getAllCostumer);
router.get("/getcostumer", CostumerController.getCostumer)
router.put("/update/:id", CostumerController.update);
router.delete("/delete/:id", CostumerController.delete)

module.exports = router;