const busController = require("../../controllers/Transportation/busController");
const express = require("express");
const router = express.Router();

router
  .route("/bus")
  .post(busController.addBusDetails)
  .get(busController.getAllBusDetails);

router
  .route("/bus/:id")
  .put(busController.updateBusDetails)
  .get(busController.getBusDetails);

module.exports = router;
