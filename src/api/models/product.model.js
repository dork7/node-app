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
    productId: {
      type: String,
      maxlength: 64,
      // index: true,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      maxlength: 64,
      // index: true,
      trim: true,
    },
    productOwner: {
      type: String,
      maxlength: 64,
      // index: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
    const fields = ["id", "productId", "productName", "productOwner"];

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
  list({ page = 1, perPage = 30, productId, withUser }) {
    const options = omitBy({ productId }, isNil);
    if (withUser) {
      return this.find(options)
        .populate({
          path: "userId",
          select: { firstName: 1, lastName: 1, email: 1 },
        })
        .exec();
    }
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};
// productSchema.index({ productId: "text" });
productSchema.index({ "$**": "text" });

/**
 * @typedef product
 */
module.exports = mongoose.model("Product", productSchema);
