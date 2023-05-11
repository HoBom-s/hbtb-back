import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import { STATIC_TAG, STATIC_TAG_UPDATE } from "../static/model.const";
import tagController from "../controllers/tag.controller";

const router = express.Router();

router.get("/", tagController.getAllTagRequest);

router.post(
  "/create",
  bodyValidation(STATIC_TAG),
  tagController.createTagRequest
);

router.patch(
  "/update",
  bodyValidation(STATIC_TAG_UPDATE),
  tagController.updateTagReqest
);

export default router;
