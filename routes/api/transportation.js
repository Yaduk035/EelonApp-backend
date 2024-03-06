const busController = require("../../controllers/Transportation/busController");
const express = require("express");
const router = express.Router();

///////// 'transportation/*'  /////////////

router.route("/bus/filter").put(busController.busFiltering);
router.route("/bus/filter-students").put(busController.busStudentFiltering);

router
  .route("/bus/complaints/:id")
  .post(busController.addComplaints)
  .put(busController.updateComplaints);

router
  .route("/bus")
  .post(busController.addBusDetails)
  .get(busController.getAllBusDetails);

router
  .route("/bus/:id")
  .put(busController.updateBusDetails)
  .get(busController.getBusDetails);

module.exports = router;
