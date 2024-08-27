const express = require("express");
const app = express();

const { getTopics, getEndpoints } = require("../controllers/controller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

// Invalid endpoint - Get - Default Error Handler
app.use((req, res, next) => {
  console.log("reached default");
  res.status(404).send({ msg: "Page not found" });
  next();
});

module.exports = app;
