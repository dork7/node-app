const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");

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


describe("Send mail", () => {
    it("API: /v1/mail", async () => {
        const res = await request(app).post("/v1/mail").send({
            "email": ["hamzameh122@gmail.com" , "hamxa2266@gmail.com"],
            "subject": "Testing email from jest",
            "mailBody": "Dear  <p>This is a testing mail </p>  <p>Checking content </p> <br>  <p>Please dont do this </p> <h2>lol </h2>"
        });
        const { success, mailRes : {accepted} } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accepted.length).toBeGreaterThan(0)
        // expect(refreshToken).not.toBe("");
    });

});

