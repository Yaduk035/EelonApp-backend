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
      { upsert: true },
      { new: true }
    );
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding admission fee", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAccounts,
  deleteAccounts,
  updateAccounts,
  getAllAccounts,
  getAccountsById,
  addAdmissionfees,
};
