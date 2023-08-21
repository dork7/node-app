const request = require('supertest');
const app = require("../../../config/express");
const mongoose = require("mongoose");

require("../../../config/express");


let reqRefreshToken = null;
let userAccessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI1OTU4NzgsInVzZXJJZCI6IjY0OTFjMjI2MGRlOTIyOGNhNmQ0ODMwZSIsImJ1c2luZXNzSWQiOm51bGx9.osuiiO86H99njcrBgKCroOw9uo46Ok0EkKlnCZUJRPk'


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const res = await request(app).post("/v1/jwt").send({
        username: "username",
    });
    const { refreshToken, accessToken } = res.body;
    reqRefreshToken = refreshToken;
    userAccessToken = `Bearer ${accessToken}`;

});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe("Get Products", () => {
    it("API: /v1/product", async () => {
        const res = await request(app).get("/v1/product")
        const { success, count, products } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(products.length).toBeGreaterThan(0)
        expect(count).toBeGreaterThan(0);
    });

    let producdId = '6491ccdfb99d2692b4eabd8c'
    it("API: /v1/product", async () => {
        const res = await request(app).get(`/v1/product/${producdId}`)
        const { success, product } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(product.id).toBe(producdId);
    });


    // TODO: Write auth test cases first
    it("API: /v1/product/protected", async () => {
        const res = await request(app).get("/v1/product/protected").set('Authorization', userAccessToken)
        const { success, count, products } = res.body;
        expect(res.statusCode).toBe(200);
        expect(success).toBe(true);
        expect(products.length).toBeGreaterThan(0)
        expect(count).toBeGreaterThan(0);
    });


});