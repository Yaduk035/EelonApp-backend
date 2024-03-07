const payRollModel = require("../../models/Payroll/PayrollModel");

const createPayroll = async (req, res) => {
  try {
    const data = req.body;
    const result = await payRollModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Retrieve all payroll records
const getAllPayrolls = async (req, res) => {
  try {
    const result = await payRollModel.find();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error fetching data", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Retrieve a single payroll record by ID
const getPayrollById = async (req, res) => {
  try {
    const result = await payRollModel.findById(req.params.id);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error fetching data", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update a payroll record by ID
const updatePayroll = async (req, res) => {
  try {
    const data = req.body;
    const result = await payRollModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result)
      return res
        .status(400)
        .json({ message: "Error updating data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete a payroll record by ID
const deletePayroll = async (req, res) => {
  try {
    const result = await payRollModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error deleting data", success: false });
    res.status(201).json({ message: "Payroll deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
