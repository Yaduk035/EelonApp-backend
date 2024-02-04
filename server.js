const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const PORT = 4000;
const cors = require("cors");
require("dotenv").config();
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");

connectDb();
app.use(credentials);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/library", require("./routes/api/library"));
app.use("/api/refresh", require("./routes/api/refresh"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb database");
  app.listen(PORT, () => console.log(`Port running on ${PORT}`));
});
