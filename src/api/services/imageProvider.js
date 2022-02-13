const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djppupdjs",
  api_key: "118759718176498",
  api_secret: "kYqtB9cbWE33iryoB5z-KkacuoQ",
});

exports.uploadImageOnCloudinary = async (imagePaths) => {
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
