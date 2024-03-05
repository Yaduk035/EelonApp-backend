const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintsArray = new Schema(
  {
    title: String,
    description: String,
    status: {
      default: "not resolved",
      type: String,
    },
  },
  { timestamps: true }
);

const busSchema = new Schema(
  {
    busNo: String,
    rgNo: {
      type: String,
      trim: true,
    },
    academicYear: String,
    vehicleType: String,
    vehicleModel: String,
    seatNo: String,
    mileage: String,
    yearOfMade: String,
    driverName: String,
    helper: String,
    FC: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    RC: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    status: {
      default: "Active",
      type: String,
    },
    complaints: [complaintsArray],
  },
  { timestamps: true }
);
const bus = mongoose.model("BusData", busSchema);
module.exports = bus;
