const accountsController = require("../../../controllers/Accounts/AccountsController");
const express = require("express");
const router = express.Router();

/////////////  '/accounts/*' ///////////

router.route("/admissionfee").post(accountsController.addAdmissionfees);
router.route("/tcfee").post(accountsController.addTcfees);

///////////   Exam fee  //////////////

router.route("/examfee/filter/").put(accountsController.filterExamFee);

router
  .route("/examfee")
  .post(accountsController.addExamFee)
  .get(accountsController.getAllExamFee);

router.route("/examfee/:id").delete(accountsController.removeExamfee);

///////////   Annual day fee  //////////////

router
  .route("/annualdayfee/filter/")
  .put(accountsController.filterAnnualdayFee);

router
  .route("/annualdayfee")
  .post(accountsController.addAnnualdayFee)
  .get(accountsController.getAllAnnualdayFee);

router.route("/annualdayfee/:id").delete(accountsController.removeAnnualdayfee);

///////////   competition fee  //////////////

router
  .route("/competitionfee/filter/")
  .put(accountsController.filterCompetitionFee);

router
  .route("/competitionfee")
  .post(accountsController.addCompetitionFee)
  .get(accountsController.getAllCompetitionFee);

router
  .route("/competitionfee/:id")
  .delete(accountsController.removeCompetitionfee);

////////////////////////////////////////////////
router.route("/filter").put(accountsController.filterAccountsDb);
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
