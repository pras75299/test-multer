const path = require("path");
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
