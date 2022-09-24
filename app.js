const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const port = require("./src/api/config/config.js").PORT;
const DB_USERNAME = require("./src/api/config/config.js").DB_USERNAME;
const DB_PASSWORD = require("./src/api/config/config.js").DB_PASSWORD;
const userRouter = require("./src/api/routes/user");
const todoRouter = require("./src/api/routes/todo");
const app = express();

app.use(bodyParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://" +
    DB_USERNAME +
    ":" +
    DB_PASSWORD +
    "@furkanrecepbilen.ltjmntn.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "trello",
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("no err");
    }
  }
);

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

app.listen(port, (err, result) => {
  if (err) {
    console.log("Error listening");
  } else {
    console.log(port, " listening.");
  }
});
