const { getTopicsModel } = require("../models/model");

exports.getTopics = (req, res, next) => {
  console.log("hitting controller");
  return getTopicsModel().then((data) => {
    res.status(200).send(data);
  });
};
