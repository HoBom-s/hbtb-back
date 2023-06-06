import articleService from "../services/article.service";
import APIErrorHandler from "../helpers/error.helper";

const articleController = {};

articleController.getAllArticleRequest = async function (req, res, next) {
  try {
    const articles = await articleService.getAllArticleRequest();
    return res.status(200).send(articles);
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

export default articleController;
