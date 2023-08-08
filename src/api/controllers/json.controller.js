const mongoose = require("mongoose");
const JSONModel = require("../models/json.model");

exports.storeData = async (req, res, next) => {
    try {
        const dataCreated = await new JSONModel(JSON.stringify(req.body)).save();
        return res.status(200).json({
            dataCreated, success: true,
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