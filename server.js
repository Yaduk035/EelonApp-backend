const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const PORT = 4000;
const cors = require("cors");
require("dotenv").config();
const credentials = require("./middleware/credentials");

connectDb();
app.use(credentials);
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb database");
  app.listen(PORT, () => console.log(`Port running on ${PORT}`));
});
