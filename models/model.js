const db = require("../db/connection");

exports.getTopicsModel = () => {
  console.log("hitting model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    console.log(rows);
    return rows;
  });
};
