const busController = require("../../controllers/Transportation/busController");
const express = require("express");
const router = express.Router();

///////// 'transportation/*'  /////////////

router.route("/bus/filter").put(busController.busFiltering);
router.route("/bus/filter-students").put(busController.busStudentFiltering);

/////////// complaints  /////////////
router
  .route("/bus/complaints/:id")
  .post(busController.addComplaints)
  .put(busController.updateComplaints);

///////////  dropdowns  ///////////////
router.route("/bus/dropdowns").get(busController.busDropdowns);
router.route("/stops/dropdowns").get(busController.stopsDropdowns);

//////////  Price  //////////////////
router
  .route("/bus/kmprice")
  .put(busController.addPrice)
  .get(busController.getPrice);

router.route("/bus/kmprice/:id").delete(busController.deletePrice);

////////////  Stops  /////////////////
router
  .route("/bus/stops")
  .get(busController.getAllStops)
  .post(busController.addStops);
router
  .route("/bus/stops/:id")
  .get(busController.getStop)
  .put(busController.updateStop)
  .delete(busController.deleteStop);

///////////////////////////////////////
router
  .route("/bus")
  .post(busController.addBusDetails)
  .get(busController.getAllBusDetails);

router
  .route("/bus/:id")
  .put(busController.updateBusDetails)
  .get(busController.getBusDetails);

module.exports = router;
