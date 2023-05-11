import { v4 as uuid4 } from "uuid";
import CategoryModel from "../schema/category.schema";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Category Service
 * Business login of category
 */
const categoryService = {};

categoryService.getAllCategoryRequest = async function () {
  try {
    const categories = await CategoryModel.find({}, null, {
      sort: {
        sortIndex: 1,
      },
    });
    if (!categories.length) return [];
    return categories;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all category request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(
      `The get all category request error with ${status}! ${msg}`
    );
  }
};

categoryService.createCategoryRequest = async function (
  title,
  path,
  sortIndex,
  spot
) {
  try {
    const found = await CategoryModel.findOne({ title: title }).exec();
    if (found) {
      const error = new APIErrorHandler(
        `The ${title} Category already exist!`,
        400
      );
      return {
        error: error,
      };
    }
    const createdCategory = await CategoryModel.create({
      _id: uuid4(),
      title: title,
      path: path,
      sortIndex: sortIndex,
      spot: spot,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return createdCategory;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create category request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(`The create category request error with ${status}! ${msg}`);
  }
};

categoryService.updateCategoryRequest = async function (
  _id,
  title,
  path,
  sortIndex,
  spot,
  updatedAt
) {
  try {
    const updatedInfo = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        title: title,
        path: path,
        sortIndex: sortIndex,
        spot: spot,
        updatedAt: updatedAt,
      }
    );
    const { acknowledged } = updatedInfo;
    if (acknowledged) return _id;
    return null;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Update category request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(`The update category request error with ${status}! ${msg}`);
  }
};

categoryService.deleteCategoryRequest = async function (_id) {
  try {
    const deleteCategoryInfo = await CategoryModel.deleteOne({ _id: _id });
    const { acknowledged } = deleteCategoryInfo;
    if (!acknowledged) {
      return null;
    }
    return _id;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Delete category request service fail! with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    throw new Error(`The delete category request error with ${status}! ${msg}`);
  }
};

Object.freeze(categoryService);
export default categoryService;
