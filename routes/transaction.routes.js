const { contractController } = require("../controllers/ContractController");

const router = require("express").Router();

router.post("/interact", contractController);

module.exports = router;
