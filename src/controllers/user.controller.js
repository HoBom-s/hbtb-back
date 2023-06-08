import APIErrorHandler from "../helpers/error.helper";
import userService from "../services/user.service";

const userController = {};

userController.createUserRequest = async function (req, res) {
  try {
    const { nickname, profileImg, role, introduction } = req.body;
    const createdUser = await userService.createUserRequest(
      nickname,
      profileImg,
      role,
      introduction
    );
    return res.status(200).send(createdUser);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create user request controller failed with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({ message: msg });
  }
};

export default userController;
