const Router = require("express").Router;
const File = require("../models/file.model.js");
const multer = require("multer");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.resolve(__dirname, "../uploads/temp");
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("profileImage"), (req, res) => {
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

module.exports = router;
