const request = require("supertest");
const app = require("../apps/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => {
  return db.end();
});

describe("/get/api/topics", () => {
  it("200: Should return an array of objects with given keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length >= 1);
        body.forEach((objectToTest) => {
          expect(objectToTest).toHaveProperty("slug");
          expect(objectToTest).toHaveProperty("description");
        });
      });
  });
});
