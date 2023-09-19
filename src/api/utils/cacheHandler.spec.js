
const { faker } = require('@faker-js/faker');
const { getCachedData, setCacheData } = require('./cacheHandler');
const { redisClient } = require('../../config/redis');


const dataSet = faker.lorem.lines(3)
const key = faker.string.alpha(10)
// jest.mock('../../config/redis')
// jest.mock('./cacheHandler')

beforeEach(async () => {
});


afterEach(async () => {

});




describe("Set/Get Cache data", () => {
    it("Store data in cache", async () => {
        const resp = await setCacheData(key, dataSet)
        expect(resp).toBe(true)
    });
    it("Get data from cache", async () => {
        const resp = await getCachedData(key)
        expect(resp).toBe(dataSet)
    });


});

