import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import { STATIC_ARTICLE } from "../static/model.const";
import articleController from "../controllers/article.controller";

const router = express.Router();

router.get("/", articleController.getAllArticleRequest);

router.post(
  "/create",
  bodyValidation(STATIC_ARTICLE),
  articleController.createArticleRequest
);
