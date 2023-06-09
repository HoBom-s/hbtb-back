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
    next(error);
  }
};

export default userController;
