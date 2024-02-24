const accountsController = require("../../../controllers/Accounts/AccountsController");
const express = require("express");
const router = express.Router();

/////////////  '/accounts/*' ///////////

router.route("/admissionfee").post(accountsController.addAdmissionfees);

router
  .route("/")
  .get(accountsController.getAllAccounts)
  .post(accountsController.createAccounts);

router
  .route("/:id")
  .get(accountsController.getAccountsById)
  .put(accountsController.updateAccounts)
  .delete(accountsController.deleteAccounts);

module.exports = router;
