const express = require("express");
const app = express();

const { getTopics } = require("../controllers/controller");

console.log(getTopics);

app.get("/api/topics", getTopics);

module.exports = app;
