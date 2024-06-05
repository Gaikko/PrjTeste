const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.status(200).send("Hello Word!");
})

module.exports = router;