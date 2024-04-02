const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    // Ensure async removal of the local file using fs.promises to avoid blocking.
    await fs.promises.unlink(localFilePath).catch(console.error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
