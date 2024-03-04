const busModel = require("../../models/Transportation/BusSchema");

const addBusDetails = async (req, res) => {
  try {
    const data = req.body;
    const result = await busModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllBusDetails = async (req, res) => {
  try {
    const result = await busModel.find();
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getBusDetails = async (req, res) => {
  try {
    const result = await busModel.findById(req.params.id);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteBusDetails = async (req, res) => {
  try {
    const result = await busModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateBusDetails = async (req, res) => {
  try {
    const data = req.body;
    const result = await busModel.findByIdAndUpdate(req.params.id, data);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  addBusDetails,
  getAllBusDetails,
  getBusDetails,
  deleteBusDetails,
  updateBusDetails,
};