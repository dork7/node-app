const mongoose = require("mongoose");
const JSONModel = require("../../models/json.model");
const { omitBy, isNil } = require("lodash");

exports.storeData = async (req, res, next) => {
    try {
        const data = {
            dataId: req.body.dataId,
            jsonData: req.body.jsonData,
            testData: req.body.testData ?? false
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
        const data = await JSONModel.find().sort({ 'createdAt': -1 });
        return res.status(200).json({
            count: data.length,
            data, success: true,
        });
    } catch (error) {
        return next(error);
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const testData = req.query.testData
        const options = omitBy({ testData }, isNil);
        const data = await JSONModel.remove(options)
        return res.status(200).json({
            data, success: true,
        });
    } catch (error) {
        return next(error);
    }
};