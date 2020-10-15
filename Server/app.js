const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const app = express();

app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", routes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
    console.log("started at", process.env.PORT);
    app.emit("started"); // for tests
  })
  .catch((err) => console.log(err));

module.exports = app;
