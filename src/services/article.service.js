import { v4 as uuid4 } from "uuid";
import ArticleModel from "../schema/article.schema";
import tagService from "./tag.service";
import TagModel from "../schema/tag.schema";
import UserModel from "../schema/user.schema";
import utilFunc from "../utils/func";

const articleService = {};

/**
 * Article 내의 tags 다루기
 * 이미 tag collection에 존재하는 태그라면 _id값만 저장
 * 새로운 태그라면 tag collection에 저장하고, _id값 저장
 */

// asyncForEach 함수로 반복문 돌리기
articleService.tagControl = async function (tags) {
  const theArticleTags = [];

  await utilFunc.asyncForEach(tags, async (tag) => {
    const foundTag = await TagModel.findOne({
      title: tag.title,
      path: tag.path,
    });
    if (!foundTag) {
      const createdTag = await tagService.createTagRequest(tag.title, tag.path);
      theArticleTags.push(createdTag._id);
    } else {
      theArticleTags.push(foundTag._id);
    }
  });
  return theArticleTags;
};

/**
 * Article writers 저장
 * 기존의 user 중 writer를 찾아 _id값 저장
 */
articleService.writerControl = async function (writers) {
  const theArticleWriters = [];

  await utilFunc.asyncForEach(writers, async (writer) => {
    const foundUser = await UserModel.findOne({
      nickname: writer,
    });
    if (foundUser) theArticleWriters.push(foundUser._id);
  });

  return theArticleWriters;
};

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

  if (foundArticle) throw new Error("Article not found!");

  const res = utilFunc.invokeAll([
    await this.tagControl(tags),
    await this.writerControl(writers),
  ]);

  const createdArticle = await ArticleModel.create({
    _id: uuid4(),
    thumbnail: thumbnail,
    title: title,
    subtitle: subtitle,
    contents: contents,
    tags: res[0],
    writers: res[1],
    path: path,
  });

  return createdArticle;
};

articleService.updateArticleRequest = async function (
  _id,
  thumbnail,
  title,
  subtitle,
  contents,
  tags,
  writers,
  path
) {
  const res = utilFunc.invokeAll([
    await this.tagControl(tags),
    await this.writerControl(writers),
  ]);

  const updatedArticle = await ArticleModel.findByIdAndUpdate(
    _id,
    {
      thumbnail,
      title,
      subtitle,
      contents,
      tags: res[0],
      writers: res[1],
      path,
    },
    {
      new: true,
    }
  );
  return updatedArticle;
};

articleService.deleteArticleRequest = async function (_id) {
  await ArticleModel.findByIdAndDelete(_id);
  return;
};

Object.freeze(articleService);
export default articleService;
