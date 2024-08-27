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
const fs = require("fs/promises");
const data = require("../endpoints.json");

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
        body = body.topics;
        expect(body.length >= 1);
        body.forEach((objectToTest) => {
          expect(objectToTest).toHaveProperty("slug");
          expect(objectToTest).toHaveProperty("description");
        });
      });
  });
  it("404: Should return an error for an endpoint that dosn't exist", () => {
    return request(app)
      .get("/api/hello")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
});
describe("/get/api ", () => {
  it("200: Should return a list of all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(data);
      });
  });
});
describe("/get/api/articles/:article_id ", () => {
  it("200: Should return an article object selected by a parametric endpoint, with apropriate keys", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        body = body.articles;
        expect(body.length > 0);
        body.forEach((body) => {
          expect(body).toHaveProperty("author");
          expect(body).toHaveProperty("title");
          expect(body).toHaveProperty("article_id");
          expect(body).toHaveProperty("body");
          expect(body).toHaveProperty("topic");
          expect(body).toHaveProperty("created_at");
          expect(body).toHaveProperty("votes");
          expect(body).toHaveProperty("article_img_url");
        });
      });
  });
  it("404: Should receive an approperiate error message for an incorrect value of the correct data type", () => {
    return request(app)
      .get("/api/articles/1000000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Page not found - invalid Id");
      });
  });
  it("400: Should receive an approperiate error message for incorrect data type", () => {
    return request(app)
      .get("/api/articles/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request - bad Id");
      });
  });
});
