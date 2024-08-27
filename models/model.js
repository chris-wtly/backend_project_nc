const db = require("../db/connection");
const fs = require("fs/promises");

exports.getTopicsModel = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Invalid Query" });
    }
    return { topics: rows };
  });
};

exports.getEndpointsModel = () => {
  return fs.readFile("./endpoints.json", "utf8").then((data) => {
    return JSON.parse(data);
  });
};

exports.getArticlesModel = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page not found - invalid Id" });
      }
      return { articles: rows };
    });
};
