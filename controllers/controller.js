const {
  getTopicsModel,
  getEndpointsModel,
  getArticlesModel,
  getArticlesByIdModel,
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
  return getArticlesModel()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesById = (req, res, next) => {
  const id = req.params.id;
  return getArticlesByIdModel(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
