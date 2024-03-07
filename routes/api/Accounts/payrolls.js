const express = require("express");
const router = express.Router();
const payRollController = require("../../../controllers/PayRoll/payRollController");

/////////////  '/payroll/*'  //////////////
router
  .route("/staff")
  .post(payRollController.createPayroll)
  .get(payRollController.getAllPayrolls);

router
  .route("/staff/:id")
  .get(payRollController.getPayrollById)
  .put(payRollController.updatePayroll)
  .delete(payRollController.deletePayroll);

module.exports = router;
