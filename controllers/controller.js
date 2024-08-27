const { getTopicsModel } = require("../models/model");

exports.getTopics = (req, res, next) => {
  return getTopicsModel()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
