const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const db = require("./config/mongoose");

//cors error
const cors = require("cors");

//used for session cookie
const session = require("express-session");
const bodyParser = require("body-parser");

const PORT = process.env.PORT; // by default runs at port : 80

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true })); // for post request
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`server is running on port ${PORT}`);
});
