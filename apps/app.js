const express = require("express");
const app = express();

const {
  getTopics,
  getEndpoints,
  getArticles,
} = require("../controllers/controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:id", getArticles);

app.use((err, req, res, next) => {
  if (err.msg === "Page not found - invalid Id") res.status(404).send(err);
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02")
    res.status(400).send({ msg: "Bad request - bad Id" });
  next(err);
});

// Invalid endpoint - Get - Default Error Handler
app.use((req, res, next) => {
  console.log("reached default");
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
