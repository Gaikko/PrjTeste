const router = require("express").Router();

const CompanyController = require("../Controllers/CompanyController");

router.post("/create", CompanyController.create);
router.get("/getcompany", CompanyController.getCompany);

module.exports = router;