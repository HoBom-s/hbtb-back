import userService from "../services/user.service";

const userController = {};

userController.createUserRequest = async function (req, res, next) {
  try {
    const { nickname, password, profileImg, role, introduction } = req.body;
    const createdUser = await userService.createUserRequest(
      nickname,
      password,
      profileImg,
      role,
      introduction
    );
    return res.status(200).send(createdUser);
  } catch (error) {
    next(error);
  }
};

userController.loginUserRequest = async function (req, res, next) {
  try {
    const { nickname, password } = req.body;
    const foundUser = await userService.loginUserRequest(nickname, password);
    return res.status(200).send(foundUser);
  } catch (error) {
    next(error);
  }
};

userController.updateUserRequest = async function (req, res, next) {
  try {
    const { _id } = req.params;
    const updates = ["nickname", "profileImg", "role", "introduction"];
    const toUpdate = {};

    updates.forEach((update) => {
      req.body[update] && (toUpdate[update] = req.body[update]);
    });

    const updatedUser = await userService.updateUserRequest(_id, toUpdate);
    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

userController.deleteUserRequest = async function (req, res, next) {
  try {
    const { _id } = req.params;
    await userService.deleteUserRequest(_id);
    return res.status(200).send("Successfully DELETED the user!");
  } catch (error) {
    next(error);
  }
};

export default userController;
