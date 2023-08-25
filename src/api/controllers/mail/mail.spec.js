const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");

require("../../../config/express");
const { faker } = require('@faker-js/faker');

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);

});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

function createRandomUser() {
    return {
        email: faker.internet.email(),
    };
}

describe("Email sending || storign in db", () => {


    const emails = faker.helpers.multiple(createRandomUser, {
        count: 2,
    }).map(item => item.email).concat('hamzameh122@gmail.com')

     it("API: /v1/mail", async () => {
        const res = await request(app).post("/v1/mail").send({
            "email": emails,
            "subject": "Testing email from jest",
            "mailBody": faker.lorem.lines() //"Dear  <p>This is a testing mail </p>  <p>Checking content </p> <br>  <p>Please dont do this </p> <h2>lol </h2>"
        });
        const { success, data: { accepted } } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(accepted.length).toBeGreaterThan(0)
    });

    it("API - GET: /v1/mail", async () => {
        const res = await request(app).get(`/v1/mail/${emails[0]}`);
        const { success, data } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(data.length).toBeGreaterThan(0)
        // expect(refreshToken).not.toBe("");
    });

});

