const db = require("../db/connection");
const fs = require("fs/promises");

exports.getTopicsModel = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "Invalid Query" });
    }
    return rows;
  });
};

exports.getEndpointsModel = () => {
  console.log("here");
  return fs.readFile("./endpoints.json", "utf8").then((data) => {
    return data;
  });
};
