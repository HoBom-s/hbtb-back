import express from "express";
import authValidation from "../middlewares/auth.middleware";
import bodyValidation from "../middlewares/body.middleware";
import {
  STATIC_TAG,
  STATIC_TAG_UPDATE,
  STATIC_TAG_DELETE,
} from "../static/model.const";
import tagController from "../controllers/tag.controller";
import paramValidation from "../middlewares/parameter.middleware";

const router = express.Router();

router.get("/", tagController.getAllTagRequest);

router.post(
  "/create",
  authValidation,
  bodyValidation(STATIC_TAG),
  tagController.createTagRequest
);

router.patch(
  "/update",
  authValidation,
  bodyValidation(STATIC_TAG_UPDATE),
  tagController.updateTagReqest
);

router.delete(
  "/delete/:_id",
  authValidation,
  paramValidation(STATIC_TAG_DELETE),
  tagController.deleteTagRequest
);

export default router;
