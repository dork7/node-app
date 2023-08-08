const mongoose = require("mongoose");
const JSONModel = require("../models/json.model");

exports.storeData = async (req, res, next) => {
    try {
        const data = {
            dataId: req.body.dataId,
            jsonData: req.body.jsonData
        }
        const dataCreated = await new JSONModel(data).save();
        return res.status(200).json({
            dataCreated,
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};
exports.getDataById = async (req, res, next) => {
    try {
        const dataId = req.params.dataId;
        const data = await JSONModel.get(dataId);
        return res.status(200).json({
            data, success: true,
        });
    } catch (error) {
        return next(error);
    }
};
exports.getAllData = async (req, res, next) => {
    try {
        const dataId = req.params.dataId;
        const data = await JSONModel.find();
        return res.status(200).json({
            data, success: true,
        });
    } catch (error) {
        return next(error);
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const data = await JSONModel.remove({})
        return res.status(200).json({
            data, success: true,
        });
    } catch (error) {
        return next(error);
    }
};