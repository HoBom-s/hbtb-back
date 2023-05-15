import categoryService from "../services/category.service";
import APIErrorHandler from "../helpers/error.helper";

const categoryController = {};

categoryController.getAllCategoryRequest = async function (req, res) {
  try {
    const categories = await categoryService.getAllCategoryRequest();
    res.status(200).send(categories);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all category request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

categoryController.createCategoryRequest = async function (req, res) {
  try {
    const { title, path, sortIndex, spot } = req.body;
    const validSpot = ["H", "F"];
    const isValidSpot = validSpot.includes(spot);
    if (!isValidSpot) {
      return res.status(400).send({
        message: "Invalid Category Spot Data",
      });
    }
    const createdCategory = await categoryService.createCategoryRequest(
      title,
      path,
      sortIndex,
      spot
    );
    res.status(200).send(createdCategory);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create category request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

categoryController.updateCategoryRequest = async function (req, res) {
  try {
    const { _id, title, path, sortIndex, spot, updatedAt } = req.body;
    const updatedCategory = await categoryService.updateCategoryRequest(
      _id,
      title,
      path,
      sortIndex,
      spot,
      updatedAt
    );
    if (!updatedCategory) {
      return res.status(400).send({
        message: "Update category request controller fail",
      });
    }
    res.status(200).send(updatedCategory);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Update category request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

categoryController.deleteCategoryRequest = async function (req, res) {
  try {
    const { _id } = req.params;
    const deletedCategory = await categoryService.deleteCategoryRequest(_id);
    if (!deletedCategory) {
      return res.status(404).send({
        message: "Delete category request controller fail",
      });
    }
    res.status(200).send(deletedCategory);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Delete category request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

Object.freeze(categoryController);
export default categoryController;
