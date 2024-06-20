const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Successfully Connected to Mongo Db server");
});

db.on("error", (err) => {
  console.log(`There is some error occured! ${err}`);
});

db.on("disconnected", () => {
  console.log("mongodb disconncted");
});

module.exports = db;
