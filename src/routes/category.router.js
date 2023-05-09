import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import paramValidation from "../middlewares/parameter.middleware";
import {
  STATIC_CATEGORY,
  STATIC_CATEGORY_UPDATE,
  STATIC_CATEGORY_DELETE,
} from "../static/model.const";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router.get("/", categoryController.getAllCategoryRequest);

router.post(
  "/create",
  bodyValidation(STATIC_CATEGORY),
  categoryController.createCategoryRequest
);

router.patch(
  "/update",
  bodyValidation(STATIC_CATEGORY_UPDATE),
  categoryController.updateCategoryRequest
);

router.delete(
  "/:_id",
  paramValidation(STATIC_CATEGORY_DELETE),
  categoryController.deleteCategoryRequest
);

export default router;
