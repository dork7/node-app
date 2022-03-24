const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");

const APIError = require("../utils/APIError");

/**
 * User Schema
 * @private
 */

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      maxlength: 64,
      // index: true,p
      trim: true,
    },
    productOwner: {
      type: String,
      maxlength: 64,
      // index: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
productSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    const rounds = 6;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Virtual - Saves fullName in Database
 */
productSchema.virtual("fullName").get(() => {
  return this.firstName + " " + this.lastName;
});

/**
 * Methods
 */
productSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "firstName",
      "lastName",
      "gender",
      "phoneNumber",
      "userLocation",
      "email",
      "picture",
      "role",
      "isEmailConfirmed",
      "isPhoneVerified",
      "businessId",
      "accessControl",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * Statics
 */
productSchema.statics = {
  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }

      if (user) {
        return user;
      }

      throw new APIError({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model("Product", productSchema);
