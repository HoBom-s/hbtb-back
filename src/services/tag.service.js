import { v4 as uuid4 } from "uuid";
import TagModel from "../schema/tag.schema";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Tag Service
 * Business logic of tag
 */
const tagService = {};

tagService.getOneTagByIdRequest = async function (_id) {
  const foundTag = await TagModel.findOne({
    _id: _id,
  }).exec();
  if (!foundTag) return null;
  return foundTag;
};

tagService.getAllTagRequest = async function () {
  const tags = await TagModel.find({}).exec();
  if (!tags.length) return [];
  return tags;
};

tagService.createTagRequest = async function (title, path) {
  const found = await TagModel.findOne({ title: title, path: path }).exec();
  if (found) throw new APIErrorHandler(`The ${title} Tag already exist!`, 404);
  const createdTag = await TagModel.create({
    _id: uuid4(),
    title: title,
    path: path,
    count: 0,
    createdAt: new Date(),
  });
  return createdTag;
};

tagService.updateTagRequest = async function (_id, title, path, count) {
  const updatedTag = await TagModel.updateOne(
    {
      _id: _id,
    },
    {
      title: title,
      path: path,
      count: count,
    }
  ).exec();
  const { acknowledged } = updatedTag;
  if (acknowledged) {
    return {
      _id: _id,
      title: title,
      path: path,
      count: count,
    };
  }
  return null;
};

tagService.deleteTagRequest = async function (_id) {
  const foundTagInfo = await this.getOneTagByIdRequest(_id);
  if (!foundTagInfo)
    throw new APIErrorHandler(`Get one tag by id failed with ${_id}`, 404);
  const deleteTagInfo = await TagModel.deleteOne({ _id: _id }).exec();
  const { acknowledged } = deleteTagInfo;
  if (!acknowledged) {
    return null;
  }
  return _id;
};

Object.freeze(tagService);
export default tagService;
