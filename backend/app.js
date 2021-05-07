const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./router/auth");
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./db/connection");

app.use(express.json());
const User = require("./model/user");
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("about page");
});
app.get("/contact", (req, res) => {
  // res.cookie("Test", jtok);
  res.send("contact page");
});

app.get("/signin", (req, res) => {
  res.send("signin page");
});
app.get("/signup", (req, res) => {
  res.send("signup page");
});
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT} `);
});
