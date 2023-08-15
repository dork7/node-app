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
    let reqRefreshToken = null
    it("API: /v1/jwt ", async () => {
        const res = await request(app).post("/v1/jwt").send({
            username: "username",
        });
        const { success, accessToken, refreshToken } = res.body;
        reqRefreshToken = refreshToken
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accessToken).not.toBe("");
        expect(refreshToken).not.toBe("");
    });


    it("API: /v1/jwt/refresh-token ", async () => {
        const res = await request(app).post("/v1/jwt/refresh-token").send({
            refreshToken: reqRefreshToken
        });
         const { success, accessToken } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accessToken).not.toBe("");
        
    });
    
    it("API wrong reqfreshToken: /v1/jwt/refresh-token ", async () => {
        const res = await request(app).post("/v1/jwt/refresh-token").send({
            refreshToken: 'random token'
        });
        const { success, message } = res.body;
        console.log('res.body', res.body)
        expect(res.statusCode).toBe(400);
        expect(success).toBe(false);
        expect(message).toBe('Invalid refresh Token');
 
    });


});
