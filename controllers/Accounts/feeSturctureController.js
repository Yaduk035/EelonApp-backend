const feeStructureModel = require("../../models/Accounts/FeeStrucureSchema");

const addFeeStructure = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data sent", success: false });
    const result = await feeStructureModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "error creating fee structure", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteFeeStructure = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await feeStructureModel.findByIdAndDelete(id);
    if (!result)
      return res
        .status(400)
        .json({ message: "error deleting fee structure", success: false });
    res.status(201).json({ message: "Fee structure deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateFeeStructure = async (req, res) => {
  try {
    const data = req.data;
    const id = req.params.id;
    const result = await feeStructureModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!result)
      return res
        .status(400)
        .json({ message: "error updating fee structure", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllFeeStructures = async (req, res) => {
  try {
    const result = await feeStructureModel.find().exec();
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getFeeStructureById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await feeStructureModel.findById(id).exec();
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const filterFeeStructure = async (req, res) => {
  try {
    const pipeline = [];
    // const { type, std, academicYear, amount, term } = req.body;
    const { id, std, academicYear, othersType, feeType, term } = req.body;

    if (id) pipeline.push({ $match: { _id: id } });
    if (std) pipeline.push({ $match: { std: std } });
    if (academicYear) pipeline.push({ $match: { academicYear: academicYear } });
    if (othersType) pipeline.push({ $match: { othersType: othersType } });
    if (feeType) pipeline.push({ $match: { feeType: feeType } });
    if (term) pipeline.push({ $match: { term: term } });

    const result = await feeStructureModel.aggregate(pipeline);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getFeeStructureDropdowns = async (req, res) => {
  try {
    const result = await feeStructureModel.aggregate([
      { $match: { feeType: "Others" } },
      { $group: { _id: "$feeType" } },
      { $project: { _id: 0, feeType: "$_id" } },
    ]);
    if (!result) return res.status(400).json({ message: "No dropdowns found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// const filterFeestructure = async (req, res) => {
//   const pipeline = [];
//   const { id, std, academicYear, othersType, feeType, term } = req.body;

//   if (!req.body)
//     return res.status(400).json({ message: "No data sent", success: false });

//   if (id) pipeline.push({ $match: { _id: id } });
//   if (std) pipeline.push({ $match: { std: std } });
//   if (academicYear) pipeline.push({ $match: { academicYear: academicYear } });
//   if (othersType) pipeline.push({ $match: { othersType: othersType } });
//   if (feeType) pipeline.push({ $match: { feeType: feeType } });
//   if (term) pipeline.push({ $match: { term: term } });

//   try {
//     const result = await feeStructureModel.aggregate([
//       ...pipeline,
//       // {
//       //   $unwind: "$annualDay",
//       // },
//       // {
//       //   $replaceRoot: { newRoot: "$annualDay" },
//       // },
//     ]);
//     if (!result)
//       res.status(404).json({ message: "No data found", success: false });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  addFeeStructure,
  deleteFeeStructure,
  updateFeeStructure,
  getAllFeeStructures,
  getFeeStructureById,
  filterFeeStructure,
  getFeeStructureDropdowns,
};
