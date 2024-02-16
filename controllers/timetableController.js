const ClassTimetableTemplate = require("../models/classTimeTableTemplate");

const addTemplate = async (req, res) => {
  try {
    const data = req.body;
    const template = await ClassTimetableTemplate.create(data);
    if (!template)
      res
        .status(400)
        .json({ message: "Error creating attendance", success: false });
    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getTemplates = async (req, res) => {
  try {
    const templates = await ClassTimetableTemplate.find().exec();
    if (!templates)
      res.status(404).json({ message: "No templates found", success: false });
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getTemplateByTemplateId = async (req, res) => {
  try {
    const templateId = req.params.id;
    const templates = await ClassTimetableTemplate.findOne({
      templateId: templateId,
    }).exec();
    if (!templates)
      res.status(404).json({ message: "No templates found", success: false });
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateTemplateById = async (req, res) => {
  try {
    const id = req.params.id;
    const { templateId, classType, day } = req.body;
    const templates = await ClassTimetableTemplate.findOneAndUpdate(
      { _id: id },
      { templateId, classType, day },
      { new: true }
    ).exec();
    if (!templates)
      res.status(404).json({ message: "No templates found", success: false });
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const addTimetableToArray = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .json({ message: "No id sent with params", success: false });
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data sent with body" });
    const timetableData = await ClassTimetableTemplate.updateOne(
      { _id: id },
      { $push: { timeTableArray: data } }
    );
    res.status(201).json(timetableData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: true });
  }
};

const deleteTimetableFromArray = async (req, res) => {
  try {
    const id = req.params.id;
    const { rowId } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ message: "No id sent with params", success: false });
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data sent with body" });
    const timetableData = await ClassTimetableTemplate.updateOne(
      { _id: id },
      { $pull: { timeTableArray: { _id: rowId } } }
    );
    res.status(201).json(timetableData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: true });
  }
};

const deleteTemplateById = async (req, res) => {
  try {
    const templateId = req.params.id;
    const templates = await ClassTimetableTemplate.findByIdAndDelete(
      templateId
    ).exec();
    if (!templates)
      res.status(404).json({ message: "No templates found", success: false });
    res.status(200).json({ message: "Template deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  addTemplate,
  getTemplates,
  getTemplateByTemplateId,
  updateTemplateById,
  deleteTemplateById,
  addTimetableToArray,
  deleteTimetableFromArray,
};
