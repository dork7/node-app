const mongoose = require('mongoose');
const httpStatus = require('http-status');


const APIError = require('../utils/APIError');

/**
 * User Schema
 * @private
 */

const emailSchema = new mongoose.Schema(
    {
        email: String,
        subject: String,
        mailBody: String,
    },
    {
        timestamps: true,
    }
);

/**
 * Statics
 */
emailSchema.statics = {

    async getEmailsById(emailId) {
        try {
            let data;
             if (emailId) 
            {
                data = await this.find({ email: emailId })
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


module.exports = mongoose.model('emails', emailSchema);
