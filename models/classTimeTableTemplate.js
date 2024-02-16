const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perDaySchema = new Schema(
  {
    day: {
      type: String,
    },
    timeIn: {
      type: String,
    },
    timeOut: {
      type: String,
    },
    periodNo: {
      type: String,
    },
    type: {
      type: Object,
    },
  },
  { timestamps: true }
);

const timeTableTemplateSchema = new Schema(
  {
    templateId: {
      type: String,
    },
    classType: {
      type: String,
    },
    timeTableArray: [perDaySchema],
  },
  { timestamps: true }
);

const timeTableTemplate = mongoose.model(
  "TimeTableTemplate",
  timeTableTemplateSchema
);
module.exports = timeTableTemplate;
