const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const PORT = 4000;
const cors = require("cors");
require("dotenv").config();

connectDb();
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/api/users"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb database");
  app.listen(PORT, () => console.log(`Port running on ${PORT}`));
});
