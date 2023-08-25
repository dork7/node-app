const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");
const { refreshJwtToken } = require('./auth.controller');
const { faker } = require('@faker-js/faker');

require("../../../config/express");


let reqRefreshToken = null;


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe("Login/logout", () => {

    const mockEmail = faker.internet.email()
    const mockPassword = faker.internet.password()

    it("API: /v1/auth/register", async () => {
        const res = await request(app).post("/v1/auth/register").send({
            "email": mockEmail,
            "password": mockPassword
        });
        const { success, accessToken, refreshToken, email } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accessToken).not.toBe("");
        expect(refreshToken).not.toBe("");
    });

    it("API: /v1/auth/register Already exist user", async () => {
        const res = await request(app).post("/v1/auth/register").send({
            "email": mockEmail,
            "password": mockPassword
        });
        const { message } = res.body;
        expect(res.statusCode).toBe(409);
        expect(message).toBe("Email already registered");
    });

    it("API: /v1/auth/login", async () => {
        const res = await request(app).post("/v1/auth/login").send({
            "email": mockEmail,
            "password": mockPassword
        });
        const { success, accessToken, refreshToken, email } = res.body;
        reqRefreshToken = refreshToken
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accessToken).not.toBe("");
        expect(refreshToken).not.toBe("");
    });

    it("API: /v1/auth/login Wrong pass", async () => {
        const res = await request(app).post("/v1/auth/login").send({
            "email": mockEmail,
            "password": "this is a wrong pass"
        });
        const { message } = res.body;
        expect(res.statusCode).toBe(500);
        expect(message).toBe("Incorrect password.");
    });

    it("API: /v1/auth/login Wrong email", async () => {
        const res = await request(app).post("/v1/auth/login").send({
            "email": "wrongTestEail@email.com",
            "password": mockPassword
        });
        const { message } = res.body;
        expect(res.statusCode).toBe(404);
        expect(message).toBe("Email not found!!!");
    });

    it("API: /v1/auth/logout ", async () => {
        let refTkn = reqRefreshToken ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2MDM2NzQsImlhdCI6MTY5MjU5ODg3NCwic3ViIjoiNjQ5MWMyMjYwZGU5MjI4Y2E2ZDQ4MzBlIiwiYnVzaW5lc3NJZCI6bnVsbH0.IWdRvIpDpvs0a1bEmyyy7AXHO8unti7TSqStI2Ypwm4"
        const res = await request(app).get("/v1/auth/logout")
            // .set('cookies', [`jwtRefresh:${refTkn}`])
            .set('Cookie', ['jwtRefresh:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2MDM2NzQsImlhdCI6MTY5MjU5ODg3NCwic3ViIjoiNjQ5MWMyMjYwZGU5MjI4Y2E2ZDQ4MzBlIiwiYnVzaW5lc3NJZCI6bnVsbH0.IWdRvIpDpvs0a1bEmyyy7AXHO8unti7TSqStI2Ypwm4;'])
            .send()

    });

});
