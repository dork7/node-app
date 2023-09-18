const { storeData, getDataById, getAllData, deleteAll } = require("./json.controller");
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
        const res = await request(app).post("/v1/json-store").send({
            "jsonData": testData,
            testData: true
        });
        expect(res.statusCode).toBe(200);
    });
    it("Get the latest added record", async () => {
        const res = await request(app).get("/v1/json-store");
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].jsonData).toBe(testData)

    });
});

describe("Get Stored Data", () => {

    it("Get all the JSON data", async () => {
        const res = await request(app).get("/v1/json-store");
        expect(res.statusCode).toBe(200);
        // expect(res.body.data.length).toBeGreaterThan(0)
    });
});


describe("Delete JSON data", () => {
    it("Delete all the record", async () => {
        const res = await request(app).delete("/v1/json-store").query({ testData: true });
        expect(res.statusCode).toBe(200);

        await Promise.all(Array(8).fill(0).map((_, idx) => {
            return request(app).post("/v1/json-store").send({
                "jsonData": `THIS IS A TEST DATA ${idx}`,
                testData: true
            });
        }))
    });
});

describe("GET DATA BY ID", () => {
    let recordId = null
    const testData = 'Single record added'

    it("It should get 404 response", async () => {
        const res = await request(app).get(`/v1/json-store/${recordId}`)
        expect(res.statusCode).toBe(404);
    });

    it("STORE SINGLE RECORD IN DATABASE", async () => {
        const res = await request(app).post("/v1/json-store").send({
            "jsonData": testData,
            testData: true
        });
        recordId = res.body.dataCreated._id
        expect(res.statusCode).toBe(200);
    });

    it("GET 1 Record by ID", async () => {
        const res = await request(app).get(`/v1/json-store/${recordId}`)
        // expect(res.statusCode).toBe(200);
        // expect(res.body.data.jsonData).toBe(testData);
    });
});