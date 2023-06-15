import { v4 as uuid4 } from "uuid";
import CategoryModel from "../schema/category.schema";
import PaginatorHelper from "../helpers/paginator.helper";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Category Service
 * Business logic of category
 */
const categoryService = {};

categoryService.getOneCategoryByIdRequest = async function (_id) {
  const category = await CategoryModel.findOne({
    _id: _id,
  });
  if (!category) return null;
  return category;
};

categoryService.getAllCategoryRequest = async function () {
  // const categories = await CategoryModel.find({}, null, {
  //   sort: {
  //     sortIndex: 1,
  //   },
  // }).exec();
  const paginatorHelper = new PaginatorHelper(10, CategoryModel);
  const categories = await paginatorHelper.getDocumentsPerPage(1, {
    whereTarget: "",
    whereCondition: "",
    sortTarget: "sortIndex",
    sortCondition: 1,
  });
  if (!categories.length) return [];
  return categories;
};

categoryService.createCategoryRequest = async function (
  title,
  path,
  sortIndex,
  spot
) {
  const found = await CategoryModel.findOne({ title: title }).exec();
  if (found)
    throw new APIErrorHandler(`The ${title} Category already exist!`, 400);
  const createdCategory = await CategoryModel.create({
    _id: uuid4(),
    title: title,
    path: path,
    sortIndex: sortIndex,
    spot: spot,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return createdCategory;
};

categoryService.updateCategoryRequest = async function (
  _id,
  title,
  path,
  sortIndex,
  spot
) {
  const found = await this.getOneCategoryByIdRequest(_id);
  if (!found)
    throw new APIErrorHandler(
      `Update category request service fail! with ${_id}`,
      404
    );
  const updatedInfo = await CategoryModel.updateOne(
    {
      _id: _id,
    },
    {
      title: title,
      path: path,
      sortIndex: sortIndex,
      spot: spot,
    }
  ).exec();
  const { acknowledged } = updatedInfo;
  if (acknowledged) {
    return {
      _id: _id,
      title: title,
      path: path,
      sortIndex: sortIndex,
      spot: spot,
      updatedAt: new Date(),
    };
  } else {
    throw new APIErrorHandler("Update category request service fail!", 404);
  }
};

categoryService.deleteCategoryRequest = async function (_id) {
  const found = await this.getOneCategoryByIdRequest(_id);
  if (!found)
    throw new APIErrorHandler(
      `Delete category request service fail! with ${_id}`,
      404
    );
  const deleteCategoryInfo = await CategoryModel.deleteOne({
    _id: _id,
  }).exec();
  const { acknowledged } = deleteCategoryInfo;
  if (!acknowledged)
    throw new APIErrorHandler(
      `Delete category request service fail! with ${_id}`,
      404
    );
  return _id;
};

Object.freeze(categoryService);
export default categoryService;
