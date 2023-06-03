import { v4 as uuid4 } from "uuid";
import APIErrorHandler from "../helpers/error.helper";
import UserModel from "../schema/user.schema";

const userService = {};

userService.createUserRequest = async function (
  nickname,
  profileImg,
  role,
  introduction
) {
  try {
    const foundUser = await UserModel.findOne({
      nickname: nickname,
      role: role,
    });
    if (foundUser) {
      const error = new APIErrorHandler("Failed: Already have the user!", 400);
      return { error: error };
    }
    const createdUser = await UserModel.create({
      _id: uuid4(),
      nickname: nickname,
      profileImg: profileImg,
      role: role,
      introduction: introduction,
    });
    return createdUser;
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Failed: Create user service request failed! with ${error.message}`
    );
    const { status, msg } = apiError;
    throw new Error(`Failed: Create user service error with ${status}! ${msg}`);
  }
};

Object.freeze(userService);
export default userService;
