import { v4 as uuid4 } from "uuid";
import TagModel from "../schema/tag.schema";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Tag Service
 * Business logic of tag
 */
const tagService = {};

tagService.getOneTagRequest = async function (title) {
  try {
    const foundTag = await TagModel.findOne({
      title: title,
    }).exec();
    if (!foundTag) return "Cannot find the tag!";
    return foundTag;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get one tag request service failed with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(
      `The get one tag request service error with ${status}! ${msg}`
    );
  }
};

tagService.getAllTagRequest = async function () {
  try {
    const tags = await TagModel.find({}).exec();
    if (!tags.length) return [];
    return tags;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all tag request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(
      `The get all tag request service error with ${status}! ${msg}`
    );
  }
};

tagService.createTagRequest = async function (title, path) {
  const found = await TagModel.findOne({ title: title }).exec();
  if (found) {
    const error = new APIErrorHandler(`The ${title} Tag already exist!`, 400);
    return {
      error: error,
    };
  }
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
  try {
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
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Update tag request fail! with ${error.message}`,
      500
    );
    const { status, msg } = apiError;
    throw new Error(`The update tag service error with ${status}! ${msg}`);
  }
};

tagService.deleteTagRequest = async function (_id) {
  try {
    const deleteTagInfo = await TagModel.deleteOne({ _id: _id }).exec();
    const { acknowledged } = deleteTagInfo;
    if (!acknowledged) {
      return null;
    }
    return _id;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Delete tag request fail! with ${error.message}`,
      500
    );
    const { status, msg } = apiError;
    throw new Error(`The delete tag service error with ${status}! ${msg}`);
  }
};

Object.freeze(tagService);
export default tagService;
