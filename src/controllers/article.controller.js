import articleService from "../services/article.service";
import APIErrorHandler from "../helpers/error.helper";

const articleController = {};

articleController.getAllArticleRequest = async function (req, res) {
  try {
    const articles = await articleService.getAllArticleRequest();
    return res.status(200).send(articles);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all articles request controller failed with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

articleController.createArticleRequest = async function (req, res) {
  try {
    const { thumbnail, title, subtitle, contents, tags, writer } = req.body;
    const createdArticle = await articleService.createArticleRequest(
      thumbnail,
      title,
      subtitle,
      contents,
      tags,
      writer
    );
    return res.status(200).send(createdArticle);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create article request controller failed with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

export default articleController;
