const path = require("path");
const express = require("express");
const ejs = require("ejs");
const uploadRouter = require("./routes/upload.js");
const connectDB = require("./db/db.js");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// url encoded is use for parsing the form data, because data coming from frontend is not in json
app.use(express.urlencoded({ extended: false })); // express.urlencoded is a middleware

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});

// route where the upload route will get handled
app.use("/api/v1/upload", uploadRouter);
//mongo db connection method
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Everything is working fine on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Message: Error in mongodb connect with ${error}`);
  });

module.exports = app;
