import { v4 as uuid4 } from "uuid";
import TagModel from "../schema/tag.schema";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Tag Service
 * Business logic of tag
 */
const tagService = {};

tagService.getAllTagRequest = async function () {
  try {
    const tags = await TagModel.find({});
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

tagService.createTagRequest = async function (title) {
  try {
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
      createdAt: Date.now(),
    });
    return createdTag;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create tag request fail! with ${error.message}`,
      500
    );
    const { status, msg } = apiError;
    throw new Error(`The create tag service error with ${status}! ${msg}`);
  }
};

Object.freeze(tagService);
export default tagService;
