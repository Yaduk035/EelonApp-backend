const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialsSchema = new Schema(
  {
    schoolId: String,
    topic: {
      type: String,
    },
    content: {
      type: String,
    },
    link: {
      type: Object,
    },
  },
  {timestamps: true}
);

const materials = mongoose.model('materials', materialsSchema);
module.exports = materials;
