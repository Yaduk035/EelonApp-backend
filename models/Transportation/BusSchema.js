const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema({
  busNo: String,
  rgNo: String,
  vehicleModel: String,
  seatNo: String,
  mileage: String,
  yearOfMade: String,
});
const bus = mongoose.model("BusData", busSchema);
module.exports = bus;
