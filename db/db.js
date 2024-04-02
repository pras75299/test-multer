// const mongoose = require("mongoose");
// require("dotenv").config();
// //mongo db connection method
// const connectDB = mongoose
//   .connect(process.env.CONNECTION)
//   .then(() => {
//     console.log("app is connected with mongo");
//   })
//   .catch((error) => {
//     console.log(`Message: Error in mongodb connect with ${error}`);
//   });

// module.exports = connectDB;

const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection method
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("App is connected with MongoDB");
  } catch (error) {
    console.error(`Message: Error in MongoDB connect with ${error}`);
  }
};

module.exports = connectDB;
