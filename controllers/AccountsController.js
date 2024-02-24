const accounstModel = require("../models/Accounts/AccountsDb");

const createAccounts = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const result = await accounstModel.create(data);
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
    const result = await accounstModel.findByIdAndDelete(id);
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
    const result = await accounstModel.findByIdAndUpdate(id, data);
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
    const result = await accounstModel.find().exec();
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
    const result = await accounstModel.findById(id).exec();
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

module.exports = {
  createAccounts,
  deleteAccounts,
  updateAccounts,
  getAllAccounts,
  getAccountsById,
};
