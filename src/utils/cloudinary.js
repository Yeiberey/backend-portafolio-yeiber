require("dotenv").config();
const { v2, config } = require("cloudinary");
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const { upload, destroy } = v2.uploader;

config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});
const uploadImage = async (filePath, options) => {
  return await upload(filePath, {
    folder: "portafolioYeiber",
    ...options,
  });
};
const destroyImage = async (publicId) => {
  return await destroy(publicId);
};
module.exports = {
  uploadImage,
  destroyImage,
};
