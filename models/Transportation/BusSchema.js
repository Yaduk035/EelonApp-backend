const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema({
  busNo: String,
  rgNo: {
    type: String,
    trim: true,
  },
  vehicleType: String,
  vehicleModel: String,
  seatNo: String,
  mileage: String,
  yearOfMade: String,
  driverName: String,
  helper: String,
  status: {
    default: "Active",
    type: String,
  },
});
const bus = mongoose.model("BusData", busSchema);
module.exports = bus;
