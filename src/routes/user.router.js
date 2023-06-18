import express from "express";
import bodyValidation from "../middlewares/body.middleware";
import paramValidation from "../middlewares/parameter.middleware";
import {
  STATIC_USER,
  STATIC_USER_LOGIN,
  STATIC_USER_UPDATE,
  STATIC_USER_DELETE,
} from "../static/model.const";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/create",
  bodyValidation(STATIC_USER),
  userController.createUserRequest
);

router.post(
  "/login",
  bodyValidation(STATIC_USER_LOGIN),
  userController.loginUserRequest
);

router.patch(
  "/update/:_id",
  paramValidation(STATIC_USER_DELETE),
  bodyValidation(STATIC_USER_UPDATE),
  userController.updateUserRequest
);

router.delete(
  "/delete/:_id",
  paramValidation(STATIC_USER_DELETE),
  userController.deleteUserRequest
);

export default router;
