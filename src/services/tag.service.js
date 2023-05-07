import { v4 as uuid4 } from "uuid";
import TagModel from "../schema/tag.schema";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Tag Service
 * Business logic of tag
 */
const tagService = {
  createTagRequest: async function (title) {
    try {
      const found = await TagModel.findOne({ title: title }).exec();
      if (found) {
        const error = new APIErrorHandler(
          `The ${title} Tag already exist!`,
          400
        );
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
      const apiError = new APIErrorHandler("Create tag request fail!", 500);
      return {
        error: apiError,
      };
    }
  },
};

Object.freeze(tagService);
export default tagService;
