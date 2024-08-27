const {
  getTopicsModel,
  getEndpointsModel,
  getArticlesModel,
} = require("../models/model");

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
  return getEndpointsModel().then((data) => {
    res.status(200).send(data);
  });
};

exports.getArticles = (req, res, next) => {
  const id = req.params.id;
  return getArticlesModel(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
