const cloudinary = require("cloudinary").v2;
const { cloudinaryConfig } = require("../../config/vars");
cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

exports.uploadImageOnCloudinary = async (imagePaths) => {
  console.log("cloudinaryConfig", cloudinaryConfig);
  const uploadResp = await imagePaths.map(async (path) => {
    return cloudinary.uploader.upload(path).then((data) => {
      return data;
    });
  });
  return Promise.all(uploadResp);
};
exports.deleteImageFromCloudinary = async (imageIds) => {
  const deleteResp = await imageIds.map(async (id) => {
    return cloudinary.uploader.destroy(id).then((data) => {
      return data;
    });
  });
  return Promise.all(deleteResp);
};
