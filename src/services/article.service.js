import APIErrorHandler from "../helpers/error.helper";
import { ArticleSchema } from "../schema/article.schema";

const ArticleService = {};

ArticleService.getAllArticleRequest = async function () {
  try {
    const articles = await ArticleSchema.find({}).exec();
    if (!articles) return [];
    return articles;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all article request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(
      `The get all article request service error with ${status}! ${msg}`
    );
  }
};
