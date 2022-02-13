const { success, error, info } = require("consola");
const { sendMail } = require("../services/emailProvider");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");
const {
  uploadImageOnCloudinary,
  deleteImageFromCloudinary,
} = require("../services/imageProvider");

exports.uploadImage = async (req, res, next) => {
  try {
    const imagePaths = req.files.flatMap((image) => image.path);
    const uploadResp = await uploadImageOnCloudinary(imagePaths);
    const imageResp = uploadResp.flatMap((item) => {
      return { url: item.url, publicId: item.public_id };
    });
    res.status(httpStatus.OK).json({
      success: true,
      imageResp,
      // isMatched,
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteImage = async (req, res, next) => {
  try {
    const imgIds = req.body.imageIds;
    const deleteResp = await deleteImageFromCloudinary(imgIds);
    const flatData = deleteResp.flatMap((item) => item.url);
    res.status(httpStatus.OK).json({
      success: true,
      deleteResp,
      // isMatched,
    });
  } catch (error) {
    return next(error);
  }
};
