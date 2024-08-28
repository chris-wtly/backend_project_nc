const express = require("express");
const app = express();

const {
  getTopics,
  getEndpoints,
  getArticlesById,
  getArticles,
  getArticleComments,
  postComment,
  patchArticle,
  deleteComment,
} = require("../controllers/controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:id", getArticlesById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:id/comments", getArticleComments);

app.post("/api/articles/:id/comments", postComment);

app.patch("/api/articles/:id", patchArticle);

app.delete("/api/comments/:id", deleteComment);

app.use((err, req, res, next) => {
  if (err.msg === "Page not found - invalid Id") res.status(404).send(err);
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02")
    res.status(400).send({ msg: "Bad request - bad Id" });
  next(err);
});

app.use((err, req, res, next) => {
  if (err.msg === "delete err") {
    res.status(404).send({ msg: "can't delete" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({ msg: "bad request" });
  }
  next(err);
});

// Invalid endpoint - Get - Default Error Handler
app.use((req, res, next) => {
  console.log("reached default");
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
