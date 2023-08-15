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



describe("Generate token", () => {
    const refreshToken = null
    it("API: /v1/jwt ", async () => {
        const res = await request(app).post("/v1/jwt").send({
            username: "username",
        });
        const { success, accessToken, refreshToken } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accessToken).not.toBe("");
        expect(refreshToken).not.toBe("");
        refreshToken = refreshToken
    });


    it("API: /v1/jwt/refresh-token ", async () => {
        const res = await request(app).post("/v1/jwt/refresh-token").send({
            refreshToken
        });
        console.log('res', res)
        // expect(res.statusCode).toBe(200);
        // expect(success).toBe(true);
        // expect(accessToken).not.toBe("");
        // expect(refreshToken).not.toBe("");
    });


});
