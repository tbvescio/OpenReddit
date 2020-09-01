const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();


//ROUTES CONTROLLERS
const authRoutes = require("./routes/auth");
const subredditRoutes = require("./routes/subreddit");
const accountRoutes = require("./routes/account");
const postRoutes = require("./routes/post");
const searchRoutes = require("./routes/search");


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


//ROUTES
app.use("/api/", subredditRoutes);
app.use("/api/", accountRoutes);
app.use("/api/", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});



mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log("**SERVER ON " + process.env.PORT + "**")
  })
  .catch((err) => console.log(err));
