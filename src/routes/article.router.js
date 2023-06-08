import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import paramValidation from "../middlewares/parameter.middleware";
import {
  STATIC_ARTICLE,
  STATIC_ARTICLE_UPDATE,
  STATIC_ARTICLE_DELETE,
} from "../static/model.const";
import articleController from "../controllers/article.controller";

const router = express.Router();

router.get("/", articleController.getAllArticleRequest);

router.post(
  "/create",
  bodyValidation(STATIC_ARTICLE),
  articleController.createArticleRequest
);

router.patch(
  "/update/:_id",
  paramValidation(STATIC_ARTICLE_DELETE),
  bodyValidation(STATIC_ARTICLE_UPDATE),
  articleController.updateArticleRequest
);

router.delete(
  "/delete/:_id",
  paramValidation(STATIC_ARTICLE_DELETE),
  articleController.deleteArticleRequest
);

export default router;
