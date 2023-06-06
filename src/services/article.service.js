import { v4 as uuid4 } from "uuid";
import ArticleModel from "../schema/article.schema";
import tagService from "./tag.service";
import TagModel from "../schema/tag.schema";
import UserModel from "../schema/user.schema";

const articleService = {};

articleService.getAllArticleRequest = async function () {
  const articles = await ArticleModel.find({})
    .populate("tags")
    .populate("writers")
    .exec();
  if (!articles.length) return [];
  return articles;
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
  const foundArticle = await ArticleModel.findOne({
    contents: contents,
    path: path,
  }).exec();

  if (foundArticle)
    return "Failed: We already have an article with exact same contents and path!";

  /**
   * Tags
   * 이미 tag collection에 존재하는 태그라면 _id값만 저장
   * 새로운 태그라면 tag collection에 저장하고, _id값 저장
   */

  const theArticleTags = [];
  const tagPromises = tags.map(async (tag) => {
    const foundTag = await TagModel.findOne({
      title: tag.title,
      path: tag.path,
    });
    if (!foundTag) {
      const createdTag = await tagService.createTagRequest(tag.title, tag.path);
      theArticleTags.push(createdTag._id);
      return;
    }
    theArticleTags.push(foundTag._id);
    return;
  });

  await Promise.all(tagPromises);

  /**
   * User(writer) 저장
   */
  const theArticleWriters = [];
  const userPromises = writers.map(async (writer) => {
    const foundUser = await UserModel.findOne({
      nickname: writer,
    });
    if (foundUser) theArticleWriters.push(foundUser._id);
    return;
  });

  await Promise.all(userPromises);

  /**
   * 해당하는 tag와 writer(user) 기입하여 Article 생성
   */
  const createdArticle = await ArticleModel.create({
    _id: uuid4(),
    thumbnail: thumbnail,
    title: title,
    subtitle: subtitle,
    contents: contents,
    tags: theArticleTags,
    writers: theArticleWriters,
    path: path,
  });

  return createdArticle;
};

Object.freeze(articleService);
export default articleService;
