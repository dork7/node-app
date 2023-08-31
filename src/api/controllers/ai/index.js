
exports.askAI = async (req, res, next) => {
    try {
  
        return res.status(200).json({
             success: true,
        });
    } catch (error) {
        return next(error);
    }
};
exports.getDataById = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};