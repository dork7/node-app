const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");
const { uploadImage } = require('./image.controller');
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});



describe("Post JSON data", () => {
    it('should successfully upload one image when image file is provided', async () => {

    });
});
