const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtRefreshSecret } = require('../../config/vars');

const APIError = require('../utils/APIError');

/**
 * User Schema
 * @private
 */

const resetPassword = {
  resetPasswordToken: {
    data: String,
    default: '',
  },
  expires: {
    expires: { type: Date },
  },
};

const emailVerification = {
  emailVerificationToken: {
    data: String,
    default: '',
  },
  expires: {
    expires: { type: Date },
  },
};

const phoneVerification = {
  isPhoneVerified: {
    type: Boolean,
    default: true, // TODO: change it to false after making confirmation page
  },
  verificationCode: {
    type: String,
    trim: true,
  },
  verificationExpiry: {
    type: Date,
  },
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 64,
      // index: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 64,
      // index: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
    },
    picture: {
      type: String,
      trim: true,
      default: 'no-photo.jpg',
    },
    role: {
      type: String,
    },
    phoneNumber: {
      type: String,
      maxlength: 128,
      trim: true,
      default: '',
    },
    isEmailConfirmed: {
      // Email Confirmation
      type: Boolean,
      required: true,
      default: true, // TODO: change it to false after making confirmation page
    },

    refreshToken: {
      data: String,
      default: '',
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    resetPassword: resetPassword,
    emailVerification: emailVerification,
    phoneVerification: phoneVerification,

    // Checks if user was deleted.
    isDeleted: {
      type: Boolean,
      default: false,
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
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

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
userSchema.virtual('fullName').get(() => {
  return this.firstName + ' ' + this.lastName;
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'name',
      'firstName',
      'lastName',
      'gender',
      'phoneNumber',
      'userLocation',
      'email',
      'picture',
      'role',
      'isEmailConfirmed',
      'isPhoneVerified',
      'businessId',
      'accessControl',
      'createdAt',
      'refreshToken',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },

  token() {
    const payload = {
      // exp: moment().add(200, 'hours').unix(),
      iat: moment().unix(),
      userId: this._id,
      role: this.role,
      businessId: this.businessId || null,
    };
    return jwt.sign(payload, jwtSecret);
  },
  getRefreshToken() {
    const payload = {
      exp: moment().add(80, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
      role: this.role,
      businessId: this.businessId || null,
    };
    return jwt.sign(payload, jwtRefreshSecret);
  },
});

/**
 * Statics
 */
userSchema.statics = {
  async generateEmailVerificationToken(user) {
    const userId = user._id;
    const userEmail = user.email;
    const resetToken = user.token();
    const expires = moment().add(480, 'minutes').toISOString();

    const emailVerification = {
      emailVerificationToken: resetToken,
      expires,
    };

    // await ResetTokenObject.save();
    await user.updateOne({ emailVerification });
    return {
      emailVerification,
      userEmail,
    };
  },

  async authenticateUser({ email, password }, next) {
    const user = await this.findOne({ email: email }, (error, doc) => {
      if (error) {
        console.log('error', error);
        throw new APIError({
          message: `Mongoose error `,
          error: error,
          // status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }).exec();
    if (user === null) {
      throw new APIError({
        message: 'Email not found!!!',
        success: false,
        errors: `Email not found`,
        status: httpStatus.NOT_FOUND,
      });
    }

    const isMatched = await user.passwordMatches(password);
    if (isMatched) {
      let token = user.token();
      let refreshToken = user.getRefreshToken();
      // update refresh token in DB
      await user.update({ refreshToken });
      return { email: user.email, accessToken: token, refreshToken };
    } else {
      throw new APIError({
        message: 'Incorrect password.',
        success: false,
      });
    }
  },

  async authenticateRefreshToken(refreshToken) {
    const user = await this.findOne({ refreshToken });

    if (!user) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Refresh Token Not Found',
      });
    }
    return jwt.verify(refreshToken, jwtRefreshSecret, (err, decoded) => {
      if (err) {
        throw new APIError({
          status: httpStatus.FORBIDDEN,
          message: 'Refresh Token Not Authentic/expired',
        });
      }
      const accessToken = user.token();
      return accessToken;
    });
  },

  async logout(refreshToken) {
    const user = await this.findOne({ refreshToken });

    if (!user) {
      // throw new APIError({
      //   status: httpStatus.NO_CONTENT,
      //   message: 'Refresh Token Not Found',
      // });
      return null;
    }

    return await user.update({ refreshToken: null });
  },

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
        message: 'User does not exist',
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

  deleteUser({ email }) {
    const options = omitBy({ email }, isNil);
    console.log('options', options);
    return this.remove(options).exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
