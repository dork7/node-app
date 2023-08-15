const { generateAccessToken } = require("./jwt.controller");
const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});



describe("Post JSON data", () => {
    const testData = "I am the test data"
    it("Store JSON data in mongodb", async () => {
        const res = await request(app).post("/v1/jwt").send({
            username: "username",
         });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.accessToken).not.toBe("");
        expect(res.body.refreshToken).not.toBe("");
    });
});
