import articleService from "../services/article.service";

const articleController = {};

articleController.getAllArticleRequest = async function (req, res, next) {
  try {
    const articles = await articleService.getAllArticleRequest();
    return res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

articleController.getArticlePerPageRequest = async function (req, res, next) {
  try {
    const { pageNumber, perPage } = req.query;
    const articles = await articleService.getArticlePerPageRequest(
      pageNumber,
      perPage
    );
    return res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

articleController.getArticleFindByPathRequest = async function (
  req,
  res,
  next
) {
  try {
    const { path } = req.params;
    const foundArticle = await articleService.getArticleFindByPathRequest(path);
    return res.status(200).send(foundArticle);
  } catch (error) {
    next(error);
  }
};

articleController.getArticleSearchRequest = async function (req, res, next) {
  try {
    const { keyword } = req.query;
    const articleSearchResult = await articleService.getArticleSearchRequest(
      keyword
    );
    return res.status(200).send(articleSearchResult);
  } catch (error) {
    next(error);
  }
};

articleController.createArticleRequest = async function (req, res, next) {
  try {
    const { thumbnail, title, subtitle, contents, tags, writers, path } =
      req.body;
    const createdArticle = await articleService.createArticleRequest(
      thumbnail,
      title,
      subtitle,
      contents,
      tags,
      writers,
      path
    );
    return res.status(200).send(createdArticle);
  } catch (error) {
    next(error);
  }
};

articleController.updateArticleRequest = async function (req, res, next) {
  try {
    const { _id } = req.params;
    const { thumbnail, title, subtitle, contents, tags, writers, path } =
      req.body;
    const updatedArticle = await articleService.updateArticleRequest(
      _id,
      thumbnail,
      title,
      subtitle,
      contents,
      tags,
      writers,
      path
    );
    return res.status(200).send(updatedArticle);
  } catch (error) {
    next(error);
  }
};

articleController.deleteArticleRequest = async function (req, res, next) {
  try {
    const { _id } = req.params;
    await articleService.deleteArticleRequest(_id);
    return res.status(200).send("Successfully DELETED the article!");
  } catch (error) {
    next(error);
  }
};

export default articleController;
