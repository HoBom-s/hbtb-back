import { v4 as uuid4 } from "uuid";
import ArticleModel from "../schema/article.schema";
import APIErrorHandler from "../helpers/error.helper";
import tagService from "./tag.service";
import userService from "./user.service";
import TagModel from "../schema/tag.schema";

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
  writers,
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

    // tags: Tag Collection 저장
    await Promise.all(
      tags.map(async (tag) => {
        const foundTag = await TagModel.findOne({
          title: tag.title,
          path: tag.path,
        }).exec();
        if (foundTag) {
          const error = new APIErrorHandler(
            "Failed: The tag already exist!",
            400
          );
          return { error: error };
        }
        return tagService.createTagRequest(tag.title, tag.path);
      })
    );

    // writers: UserModel 저장
    // userService;

    // const createdUser = await UserModel.create({})

    const createdArticle = await ArticleModel.create({
      _id: uuid4(),
      thumbnail: thumbnail,
      title: title,
      subtitle: subtitle,
      contents: contents,
      tags: tags,
      writers: writers,
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

Object.freeze(articleService);
export default articleService;
