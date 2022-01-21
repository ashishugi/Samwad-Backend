require("dotenv").config();
const mongoose = require("mongoose");
const MongoDBURL = process.env.MONGODB_URL;
mongoose.connect(
  MongoDBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("connected");
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
