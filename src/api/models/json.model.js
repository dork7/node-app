const mongoose = require('mongoose');
const httpStatus = require('http-status');


const APIError = require('../utils/APIError');

/**
 * User Schema
 * @private
 */

const jsonSchema = new mongoose.Schema(
    {

        dataId: {
            type: String,
        },
        jsonData: {
            type: String,
        }

    },
    {
        timestamps: true,
    }
);



/**
 * Statics
 */
jsonSchema.statics = {
    /**
     * Get user
     *
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
        try {
            let data;

            if (mongoose.Types.ObjectId.isValid(id)) {
                data = await this.findById(id).exec();
            }

            if (data) {
                return data;
            }

            throw new APIError({
                message: 'Data doesnt exist',
                status: httpStatus.NOT_FOUND,
            });
        } catch (error) {
            throw error;
        }
    },
}


module.exports = mongoose.model('JSONData', jsonSchema);
