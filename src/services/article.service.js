import { v4 as uuid4 } from "uuid";
import ArticleModel from "../schema/article.schema";
import TagModel from "../schema/tag.schema";
import UserModel from "../schema/user.schema";
import APIErrorHandler from "../helpers/error.helper";

const articleService = {};

articleService.getAllArticleRequest = async function () {
  try {
    const articles = await ArticleModel.find({}).exec();
    if (!articles.length) return [];
    return articles;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all articles request service failed! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(
      `Failed: Get all articles request service error with ${status}! ${msg}`
    );
  }
};

articleService.createArticleRequest = async function (
  thumbnail,
  title,
  subtitle,
  contents,
  tags,
  writer,
  path
) {
  try {
    const foundArticle = await ArticleModel.findOne({
      contents: contents,
      path: path,
    }).exec();
    if (foundArticle) {
      const error = new APIErrorHandler(
        "Failed: We already have an article with exact same contents and path!",
        400
      );
      return { error: error };
    }

    // tags TagModel 저장
    // const createdTags = await TagModel.create({
    //   _id: uuid4(),
    //   title:
    // })

    // writer UserModel 저장
    // const createdUser = await UserModel.create({})

    const createdArticle = await ArticleModel.create({
      _id: uuid4(),
      thumbnail: thumbnail,
      title: title,
      subtitle: subtitle,
      contents: contents,
      tags: tags,
      writer: writer,
      path: path,
    });
    return createdArticle;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Failed: Create article service request failed! with ${error.message}`,
      500
    );
    const { status, msg } = apiError;
    throw new Error(
      `Failed: Create artice service error with ${status}! ${msg}`
    );
  }
};

export default articleService;
