const accountsModel = require("../../models/Accounts/AccountsDb");

const createAccounts = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const result = await accountsModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating account", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccounts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await accountsModel.findByIdAndDelete(id);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error deleting account", success: false });
    res.status(201).json({ message: "Account data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAccounts = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const result = await accountsModel.findByIdAndUpdate(id, data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error updatind account", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const result = await accountsModel.find().exec();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error fethching accounts data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAccountsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await accountsModel.findById(id).exec();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error fethching accounts data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addAdmissionfees = async (req, res) => {
  try {
    const {
      studentId,
      admnId,
      studentName,
      modeOfPay,
      transactionId,
      amount,
      status,
      academicYear,
      std,
      board,
    } = req.body;
    const jsonData = {
      studentId,
      admnId,
      studentName,
      academicYear,
      std,
      board,
      admissionFees: {
        studentId,
        admnId,
        studentName,
        modeOfPay,
        transactionId,
        amount,
        status,
        academicYear,
        std,
        board,
      },
    };
    const result = await accountsModel.findOneAndUpdate({ admnId }, jsonData, {
      upsert: true,
    });
    // if (!result)
    //   return res
    //     .status(400)
    //     .json({ message: "Error adding admission fee", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addTcfees = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      modeOfPay,
      transactionId,
      amount,
      status,
      academicYear,
      std,
      board,
    } = req.body;
    const jsonData = {
      studentId,
      studentName,
      academicYear,
      std,
      board,
      admissionFees: {
        studentId,
        studentName,
        modeOfPay,
        transactionId,
        amount,
        status,
        academicYear,
        std,
        board,
      },
    };
    const result = await accountsModel.findOneAndUpdate(
      { studentId },
      jsonData,
      {
        upsert: true,
      }
    );
    // if (!result)
    //   return res
    //     .status(400)
    //     .json({ message: "Error adding admission fee", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addExamFee = async (req, res) => {
  try {
    const examfees = req.body;
    const { studentId, admnId } = examfees;
    const result = await accountsModel.updateOne(
      { studentId: studentId },
      {
        $addToSet: { examfees: examfees },
      }
    );
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding exam fee", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// const removeExamFee = async (req, res) => {
//   try {
//     const studentId = req.params.id;
//     const { examfeesId } = req.body;

//     const result = await accountsModel.aggregate([
//       { $match: { studentId: studentId } },
//       {
//         $pull: { examfees: { _id: examfeesId } },
//       },
//     ]);
//     if (!result)
//       return res
//         .status(400)
//         .json({ message: "Error deleting exam fee", success: false });
//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getAllExamFee = async (req, res) => {
  try {
    const result = await accountsModel.aggregate([
      {
        $match: {
          examfees: { $exists: true, $not: { $size: 0 } },
        },
      },
      {
        $unwind: "$examfees",
      },
      {
        $replaceRoot: { newRoot: "$examfees" },
      },
    ]);
    if (!result)
      res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const filterExamFee = async (req, res) => {
  const pipeline = [];
  const {
    id,
    std,
    classSection,
    academicYear,
    studentId,
    studentName,
    admnId,
    admsnDbId,
    rollNo,
  } = req.body;

  if (id) pipeline.push({ $match: { _id: id } });
  if (std) pipeline.push({ $match: { std: std } });
  if (classSection) pipeline.push({ $match: { classSection: classSection } });
  if (academicYear) pipeline.push({ $match: { academicYear: academicYear } });
  if (studentId) pipeline.push({ $match: { studentId: studentId } });
  if (studentName) pipeline.push({ $match: { studentName: studentName } });
  if (admnId) pipeline.push({ $match: { admnId: admnId } });
  if (admsnDbId) pipeline.push({ $match: { admsnDbId: admsnDbId } });
  if (rollNo) pipeline.push({ $match: { rollNo: rollNo } });

  try {
    const result = await accountsModel.aggregate([
      ...pipeline,
      {
        $unwind: "$examfees",
      },
      {
        $replaceRoot: { newRoot: "$examfees" },
      },
    ]);
    if (!result)
      res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeExamfee = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { deleteId } = req.body;
    const result = await accountsModel.updateOne(
      { studentId: studentId },
      { $pull: { examfees: { _id: deleteId } } }
    );
    if (!result)
      return res.status(400).json({ message: "Error deleting data" });
    res.status(200).json({ message: "exam fee deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAccounts,
  deleteAccounts,
  updateAccounts,
  getAllAccounts,
  getAccountsById,
  addAdmissionfees,
  addTcfees,
  addExamFee,
  removeExamfee,
  getAllExamFee,
  filterExamFee,
};