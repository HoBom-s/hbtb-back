import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import { STATIC_TAG } from "../static/model.const";
import tagController from "../controllers/tag.controller";

const router = express.Router();

router.get("/", tagController.getAllTagRequest);

router.post(
  "/create",
  bodyValidation(STATIC_TAG),
  tagController.createTagRequest
);

export default router;
