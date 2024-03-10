const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routesArr = new Schema({
  schoolId: String,
  id: String,
  index: String,
  stopName: String,
  distance: Number,
});

const routesSchema = new Schema({schoolId: String, busNo: String, rgNo: String, busObjId: String, route: []}, {timestamps: true});
const busRoutes = mongoose.model('stopsData', routesSchema);
module.exports = busRoutes;
