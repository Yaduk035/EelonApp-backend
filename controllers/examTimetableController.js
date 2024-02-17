const examTable = require("../models/examTableModel");

const addTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const timeTable = await examTable.create(data);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};
