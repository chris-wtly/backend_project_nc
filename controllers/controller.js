const {
  getTopicsModel,
  getEndpointsModel,
  getArticlesModel,
  getArticlesByIdModel,
  getArticleCommentsModel,
  postCommentModel,
  patchArticleModel,
  deleteCommentModel,
  getUsersModel,
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

exports.getArticleComments = (req, res, next) => {
  const id = req.params.id;
  return getArticleCommentsModel(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  return postCommentModel(id, data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  return patchArticleModel(id, data)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const id = req.params.id;
  return deleteCommentModel(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  return getUsersModel()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
