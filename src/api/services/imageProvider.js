const cloudinary = require("cloudinary").v2;
const { cloudinaryConfig } = require("../../config/vars");
cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

exports.uploadImageOnCloudinary = async (imagePaths, user = "dev") => {
  console.log('imagePaths', imagePaths)
  const response = await imagePaths?.map(async (path) => {
    return cloudinary.uploader.upload(path, {
      folder: `node-app/${user}`, // Use the user's identifier as a folder name
      tags: [user]
    }).then((data) => {
      return data;
    });
  });
  return Promise.all(response);
};
exports.deleteImageFromCloudinary = async (imageIds) => {
  const response = await imageIds.map(async (id) => {
    return cloudinary.uploader.destroy(id).then((data) => {
      return data;
    });
  });
  return Promise.all(response);
};

exports.getImagesFromCloudinary = async (userId) => {
  const response = await cloudinary.api.resources_by_tag(userId)
  return response
};
exports.deleteImagesByTag = async (userId) => {
  const response = await cloudinary.api.delete_resources_by_tag(userId)
  return response
};
