const express = require("express");
const app = express();

const { getTopics, getTopicsById } = require("../controllers/controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log("here");
  res.status(400).send({ msg: "Bad request - invalid Id" });
  next();
});

// Invalid endpoint - Get - Default Error Handler
app.use((req, res, next) => {
  console.log("reached default");
  res.status(404).send({ msg: "Page not found" });
  next();
});

module.exports = app;
