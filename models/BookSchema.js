const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    rentAmount: {
      type: Number,
    },
    imageName: {
      type: String,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
    },
    rentPeriod: {
      type: String,
    },
    rentData: {
      type: Number,
    },
    availabilityStatus: {
      type: String,
    },
    ISBNnumber: {
      type: String,
    },
    description: {
      type: String,
    },
    users: {
      wishlist: [String],
      rentlist: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: String,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const book = mongoose.model("Book", bookSchema);
module.exports = book;
