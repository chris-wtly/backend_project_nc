const { getTopicsModel, getEndpointsModel } = require("../models/model");

exports.getTopics = (req, res, next) => {
  return getTopicsModel()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (req, res, next) => {
  console.log("herre");
  return getEndpointsModel().then((data) => {
    console.log(data);
    res.status(200).send(data);
  });
};
