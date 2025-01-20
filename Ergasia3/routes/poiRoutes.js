const express = require("express");
const router = express.Router();

const {getPoisByParameters, getAllPois, validatePoi, createNewPoi, updatePoi, deletePoi} = require("../controllers/poiController.js");

router.get("/", getPoisByParameters);
router.get("/all", getAllPois);
router.post("/add", validatePoi, createNewPoi);
router.patch("/update", updatePoi);
router.delete("/delete", deletePoi);

module.exports = router;
