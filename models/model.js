const db = require("../db/connection");
const fs = require("fs/promises");
const { exists } = require("../utilsFunctions");

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

exports.getArticlesModel = () => {
  return db
    .query(`SELECT * FROM articles ORDER BY created_at DESC`)
    .then(({ rows }) => {
      const articleArray = rows.map((article) => {
        return db
          .query(`SELECT * FROM comments WHERE article_id = $1`, [
            article.article_id,
          ])
          .then(({ rows }) => {
            article.comment_count = rows.length;
            delete article.body;
            return article;
          });
      });
      return Promise.all(articleArray);
    })
    .then((data) => {
      return { articles: data };
    });
};

exports.getArticlesByIdModel = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ msg: "Page not found - invalid Id" });
      }
      return { articles: rows };
    });
};

exports.getArticleCommentsModel = (id) => {
  return db
    .query(
      `SELECT body, votes, author, article_id, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at, comment_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length < 1) {
        return exists("articles", id);
      } else {
        return rows;
      }
    })
    .then((rows) => {
      return { comments: rows };
    });
};
