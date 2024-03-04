const feeCollectionModel = require("../../models/Accounts/FeeCollectionsSchema");

const addFee = async (req, res) => {
  try {
    const data = req.body;
    const result = await feeCollectionModel.create(data);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
const getAllFeeCollections = async (req, res) => {
  try {
    const result = await feeCollectionModel.find().exec();
    if (!result)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getFeeCollection = async (req, res) => {
  try {
    const result = await feeCollectionModel.findById(req.params.id).exec();
    if (!result)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { addFee, getAllFeeCollections, getFeeCollection };
