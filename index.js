const path = require("path");
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("./models/file.model");

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
  //   return res.redirect("/");
  if (req.file) {
    const newFile = new File({
      filename: req.file.filename,
      filepath: req.file.path,
      filetype: req.file.mimetype,
      filesize: req.file.size,
    });

    newFile
      .save()
      .then(() => {
        console.log("File saved to MongoDB.");
        res.redirect("/");
      })
      .catch((err) => {
        console.error("Error saving file metadata to MongoDB:", err);
        res.status(500).send("Error uploading file.");
      });
  } else {
    res.status(400).send("No file uploaded.");
  }
});

//mongo db connection method
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    console.log("app is connected with mongo");
    app.listen(PORT, (req, res) => {
      console.log(`Everything is working fine ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Message: Error in mongodb connect with ${error}`);
  });
