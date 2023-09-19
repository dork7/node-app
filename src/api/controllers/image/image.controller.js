const { success, error, info } = require("consola");
const { sendMail } = require("../../services/emailProvider");
const User = require("../../models/user.model");
const APIError = require("../../utils/APIError");
const httpStatus = require("http-status");
const {
  uploadImageOnCloudinary,
  deleteImageFromCloudinary,
  getImagesFromCloudinary,
  deleteImagesByTag,
} = require("../../services/imageProvider");

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.files) throw Error("No image files")
    const imagePaths = req.files?.flatMap((image) => image.path);
    const userId = req.body.user
    const uploadResp = await uploadImageOnCloudinary(imagePaths, userId);
    const publicId = uploadResp?.flatMap(({ public_id }) => public_id)
    const imageURLs = uploadResp?.flatMap(({ url }) => url)
    res.status(httpStatus.OK).json({
      success: true,
      // uploadResp,
      imageURLs, publicId
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

exports.getImages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const response = await getImagesFromCloudinary(userId);
    const images = response.resources.flatMap(({ url }) => url)
    const publicId = response.resources.flatMap(({ public_id }) => public_id)
    res.status(httpStatus.OK).json({
      success: true,
      images, publicId
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteImagesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {deleted} = await deleteImagesByTag(userId);
    res.status(httpStatus.OK).json({
      success: true,
      deleted,
    });
  } catch (error) {
    return next(error);
  }
};
