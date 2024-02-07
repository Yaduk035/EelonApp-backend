const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialsSchema = new Schema(
  {
    topic: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const materials = mongoose.model("materials", materialsSchema);
module.exports = materials;
