import categoryService from "../services/category.service";

const categoryController = {};

categoryController.getAllCategoryRequest = async function (req, res, next) {
  try {
    const categories = await categoryService.getAllCategoryRequest();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
};

categoryController.createCategoryRequest = async function (req, res, next) {
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
    next(error);
  }
};

categoryController.updateCategoryRequest = async function (req, res, next) {
  try {
    const { _id, title, path, sortIndex, spot } = req.body;
    const updatedCategory = await categoryService.updateCategoryRequest(
      _id,
      title,
      path,
      sortIndex,
      spot
    );
    if (!updatedCategory) {
      return res.status(400).send({
        message: "Update category request controller fail",
      });
    }
    res.status(200).send(updatedCategory);
  } catch (error) {
    next(error);
  }
};

categoryController.deleteCategoryRequest = async function (req, res, next) {
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
    next(error);
  }
};

Object.freeze(categoryController);
export default categoryController;
