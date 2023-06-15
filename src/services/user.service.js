import { v4 as uuid4 } from "uuid";
import UserModel from "../schema/user.schema";
import APIErrorHandler from "../helpers/error.helper";

const userService = {};

userService.findOneUserRequest = async function (nickname, role) {
  if (!nickname || !role)
    throw new APIErrorHandler("Missing parameter(s)!", 404);
  const foundUser = await UserModel.findOne({
    nickname: nickname,
    role: role,
  }).exec();
  return foundUser;
};

userService.createUserRequest = async function (
  nickname,
  profileImg,
  role,
  introduction
) {
  const foundUser = await this.findOneUserRequest(nickname, role);
  if (foundUser) throw new APIErrorHandler("The user already exist!", 404);
  const createdUser = await UserModel.create({
    _id: uuid4(),
    nickname: nickname,
    profileImg: profileImg,
    role: role,
    introduction: introduction,
  });
  return createdUser;
};

userService.updateUserRequest = async function (_id, toUpdate) {
  const foundUser = await UserModel.findById(_id).exec();

  if (!foundUser) throw new APIErrorHandler("User not found!", 404);
  const updatedUser = await UserModel.findByIdAndUpdate(_id, toUpdate, {
    returnDocument: "after",
  }).exec();

  return updatedUser;
};

userService.deleteUserRequest = async function (_id) {
  const foundUser = await UserModel.findById(_id).exec();
  if (!foundUser) throw new Error("User not found!");
  await UserModel.findByIdAndDelete(_id).exec();
  return;
};

Object.freeze(userService);
export default userService;
