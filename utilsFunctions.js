const db = require("./db/connection");
const pg = require("pg-format");

exports.exists = (table, id) => {
  const queryStr = pg("SELECT * FROM %I WHERE article_id = $1;", table);
  return db.query(queryStr, [id]).then((data) => {
    if (data.rows.length === 0) {
      return Promise.reject({ msg: "Page not found - invalid Id" });
    } else {
      return Promise.all([]);
    }
  });
};

exports.existsTopic = (table, query) => {
  const queryStr = pg("SELECT * FROM %I WHERE slug = $1;", table);
  return db.query(queryStr, [query]).then((data) => {
    if (data.rows.length === 0) {
      return Promise.reject({ msg: "bad query" });
    } else {
      return Promise.all([]);
    }
  });
};
