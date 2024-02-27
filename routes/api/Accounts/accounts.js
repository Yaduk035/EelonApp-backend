const accountsController = require("../../../controllers/Accounts/AccountsController");
const feeStructureController = require("../../../controllers/Accounts/feeSturctureController");
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

///////////   Events fee  //////////////

router.route("/eventsfee/filter/").put(accountsController.filterEventsFee);

router
  .route("/eventsfee")
  .post(accountsController.addEventsFee)
  .get(accountsController.getAllEventsFee);

router.route("/eventsfee/:id").delete(accountsController.removeEventsfee);

///////////   Tour fee  //////////////

router.route("/tourfee/filter/").put(accountsController.filterTourFee);

router
  .route("/tourfee")
  .post(accountsController.addTourFee)
  .get(accountsController.getAllTourFee);

router.route("/tourfee/:id").delete(accountsController.removeTourfee);

///////////   Fines  //////////////

router.route("/fines/filter/").put(accountsController.filterFines);

router
  .route("/fines")
  .post(accountsController.addFines)
  .get(accountsController.getAllFines);

router.route("/fines/:id").delete(accountsController.removeFines);

///////////   Fee structures  //////////////

router
  .route("/feestructure/filter")
  .put(feeStructureController.filterFeeStructure);
router
  .route("/feestructure/dropdowns")
  .get(feeStructureController.getFeeStructureDropdowns);
router
  .route("/feestructure")
  .post(feeStructureController.addFeeStructure)
  .get(feeStructureController.getAllFeeStructures);
router
  .route("/feestructure/:id")
  .put(feeStructureController.updateFeeStructure)
  .delete(feeStructureController.deleteFeeStructure)
  .get(feeStructureController.getFeeStructureById);

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
