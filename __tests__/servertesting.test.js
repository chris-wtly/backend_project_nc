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
describe("/api/articles", () => {
  it("200: Should return an array of articles with appropriate keys", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toEqual([
          {
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-11-03T09:12:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 2,
          },
          {
            article_id: 6,
            title: "A",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-10-18T01:00:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 1,
          },
          {
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 12,
            title: "Moustache",
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-10-11T11:24:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 13,
            title: "Another article about Mitch",
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-10-11T11:24:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            created_at: "2020-08-03T13:14:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 2,
          },
          {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 11,
          },
          {
            article_id: 9,
            title: "They're not exactly dogs, are they?",
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-06-06T09:10:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 2,
          },
          {
            article_id: 10,
            title: "Seven inspirational thought leaders from Manchester UK",
            topic: "mitch",
            author: "rogersop",
            created_at: "2020-05-14T04:15:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 8,
            title: "Does Mitch predate civilisation?",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-04-17T01:08:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 11,
            title: "Am I a cat?",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-01-15T22:21:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
          {
            article_id: 7,
            title: "Z",
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2020-01-07T14:08:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: 0,
          },
        ]);
      });
  });
});
it("200: Should return an array of articles with appropriate keys", () => {
  return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body: { articles } }) => {
      expect(articles).toBeSortedBy("created_at", { descending: true });
    });
});
describe("api/artciles/:article_id/comments", () => {
  it("200: Should return an array of comments based on a parametric id. The object should have all apropriate keys", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([
          {
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 16,
            author: "butter_bridge",
            article_id: 9,
            created_at: "2020-04-06 13:17:00",
            comment_id: 1,
          },
          {
            body: "The owls are not what they seem.",
            votes: 20,
            author: "icellusedkars",
            article_id: 9,
            created_at: "2020-03-14 17:02:00",
            comment_id: 17,
          },
        ]);
      });
  });
  it("200: Should serve newest comment first", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("200: Should return empty array for article with no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toEqual([]);
      });
  });
  it("400: Should return error for bad id type", () => {
    return request(app)
      .get("/api/articles/yes/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request - bad Id");
      });
  });
  it("404: Should return error for bad id type", () => {
    return request(app)
      .get("/api/articles/10000/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found - invalid Id");
      });
  });
});

describe("/post/api/articles/:article_id/comments", () => {
  it("201: Should post a comment on an article, the posted comment should be made of a username and a body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ author: "butter_bridge", body: "AAAAHHHH!" })
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          comment_posted: {
            author: "butter_bridge",
            body: "AAAAHHHH!",
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: 0,
            article_id: 1,
          },
        });
      });
  });
  it("400: returns error for missing fields", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({})
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request - bad fields");
      });
  });
  it("400: returns error for incorrect data types", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ author: 5, body: 11 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
});
describe("patch/api/articles/:article_id", () => {
  it("200: Should update the articles votes and returns the updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 2 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09 21:11:00",
          votes: 102,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  it("200: Does the same for a negative vote count", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -102 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09 21:11:00",
          votes: -2,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  it("400: Returns error for missing fields", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request - bad fields");
      });
  });
  it("400: Returns error for incorrect fields", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "hello" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request - bad fields");
      });
  });
  it("400: Returns error for incorrect id of valid type", () => {
    return request(app)
      .patch("/api/articles/1000")
      .send({ inc_votes: 4 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request - bad Id");
      });
  });
  it("400: Returns error for invalid id", () => {
    return request(app)
      .patch("/api/articles/green")
      .send({ inc_votes: 4 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request - bad Id");
      });
  });
});

describe("delete/api/comments/:comment_id", () => {
  it("204: Should delete the comment by the given id and return no content", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
  it("400: Should return error for comment that doesn't exist", () => {
    return request(app)
      .delete("/api/comments/1000000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("can't delete");
      });
  });
  it("400: Should return error for comment that doesn't exist", () => {
    return request(app)
      .delete("/api/comments/viking")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request - bad Id");
      });
  });
});
describe("get/api/users", () => {
  it("200: Should return an array of user objects with appropriate keys", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toEqual([
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "icellusedkars",
            name: "sam",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
          {
            username: "lurker",
            name: "do_nothing",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          },
        ]);
      });
  });
});
describe("GET api/articles?sort_by", () => {
  it("200: Should return articles sorted by created_at column in a descenidng order when no other queries are provided", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("200: Should return articles sorted by the given column, sorted by descending when no other query is given", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("topic", { descending: true });
      });
  });
  it("200: Should return articles sorted by the given column and direction (i.e. asc/desc)", () => {
    return request(app)
      .get("/api/articles?sort_by=title&&order=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("title", { ascending: true });
      });
  });
  it("200: Should return articles sorted by the given direction (i.e. asc/desc) without a column query", () => {
    return request(app)
      .get("/api/articles?order=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { ascending: true });
      });
  });
  it("200: Should return default when given an invalid query method", () => {
    return request(app)
      .get("/api/articles?bannana=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("400: Should return error when given an incorrect query value", () => {
    return request(app)
      .get("/api/articles?sort_by=hello")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request - bad query");
      });
  });
});
describe("/api/articels/?topic", () => {
  it("200: Should return articles filtered by topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toMatchObject([
          {
            article_id: 5,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            author: "rogersop",
            comment_count: 2,
            created_at: "2020-08-03T13:14:00.000Z",
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            votes: 0,
          },
        ]);
      });
  });
  it("400: Should return error for a query that does not exist", () => {
    return request(app)
      .get("/api/articles?topic=saxophone")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request - bad query");
      });
  });
  it("200: Should return empty array for a query that exists but has no article associated with it", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toEqual([]);
      });
  });
  it("200: Should work with other queries", () => {
    return request(app)
      .get("/api/articles?topic=mitch&&sort_by=title&&order=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("title", { ascending: true });
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
});
