import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import { STATIC_USER } from "../static/model.const";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/create",
  bodyValidation(STATIC_USER),
  userController.createUserRequest
);

router.patch("/update/:_id", userController.updateUserRequest);

export default router;
