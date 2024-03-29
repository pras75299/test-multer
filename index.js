const path = require("path");
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// url encoded is use for parsing the form data, because data coming from frontend is not in json
app.use(express.urlencoded({ extended: false })); // express.urlencoded is a middleware

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});

// route where the upload route will get handled
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
