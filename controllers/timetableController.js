const ClassTimetableTemplate = require("../models/classTimeTableTemplate");
const ClassTimetable = require("../models/classTimeTable");

const addTemplate = async (req, res) => {
  try {
    const data = req.body;
    const { templateId } = data;
    const duplicateTemplate = await ClassTimetableTemplate.findOne({
      templateId,
    });
    if (duplicateTemplate)
      return res.status(409).json({
        message: `Template with template id: '${templateId}' already exists`,
        success: false,
      });
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

const getTemplateDropdowns = async (req, res) => {
  try {
    const templateIds = await ClassTimetableTemplate.aggregate([
      { $group: { _id: "$templateId" } },
      { $project: { _id: 0, templateId: "$_id" } },
    ]);
    const templateIdArray = templateIds.map((doc) => doc.templateId);
    res.status(200).json(templateIdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//////////////////////////////////////////////////////////////

const addClasswiseTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const duplicateEntry = await ClassTimetable.findOne({
      classId: data?.classId,
    });
    if (duplicateEntry)
      return res
        .status(409)
        .json({ message: "Timetable for the class already exists" });
    const timeTable = await ClassTimetable.create(data);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const updateClasswiseTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const timeTable = await ClassTimetable.findByIdAndUpdate(
      req.params.id,
      data
    );
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getAllTimetables = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.find().exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getClasswiseTimetable = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.findById(req.params.id).exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getClasswiseTimetableByClassId = async (req, res) => {
  try {
    const classId = req.params.id;
    const timeTable = await ClassTimetable.findOne({ classId: classId }).exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const deleteClasswiseTimetable = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.findByIdAndDelete(req.params.id);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json({ message: "Attendance deleted" });
  } catch (error) {
    console.error(error);
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
  getTemplateDropdowns,
  addClasswiseTimetable,
  updateClasswiseTimetable,
  getAllTimetables,
  getClasswiseTimetable,
  getClasswiseTimetableByClassId,
  deleteClasswiseTimetable,
};
