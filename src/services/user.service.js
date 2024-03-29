import { v4 as uuid4 } from "uuid";
import UserModel from "../schema/user.schema";
import authService from "./auth.service";
import BcryptHelper from "../helpers/bcrypt.helper";
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

userService.findOneUserById = async function (_id) {
  if (!_id) throw new APIErrorHandler("Missing parameter with _id!", 404);
  const foundUser = await UserModel.findOne({
    _id: _id,
  }).exec();
  return foundUser;
};

userService.findOneUserByNickname = async function (nickname) {
  if (!nickname)
    throw new APIErrorHandler("Missing parameter with nickname!", 404);
  const foundUser = await UserModel.findOne({
    nickname: nickname,
  }).exec();
  return foundUser;
};

userService.createUserRequest = async function (
  nickname,
  password,
  profileImg,
  role,
  introduction
) {
  const foundUser = await this.findOneUserRequest(nickname, role);
  if (foundUser) throw new APIErrorHandler("The user already exist!", 404);
  const bcryptHelper = new BcryptHelper();
  const hashedPassword = bcryptHelper.applyHash(password);
  const createdUser = await UserModel.create({
    _id: uuid4(),
    nickname: nickname,
    password: hashedPassword,
    profileImg: profileImg,
    role: role,
    introduction: introduction,
  });
  return createdUser;
};

userService.loginUserRequest = async function (nickname, password) {
  const foundUser = await this.findOneUserByNickname(nickname);
  const hashedPassword = foundUser.password;
  const bcryptHelper = new BcryptHelper();
  const isValidUser = bcryptHelper.compareHash(password, hashedPassword);
  if (!isValidUser) throw new APIErrorHandler("The user is not exist!", 404);

  const tokenObject = {};
  const { _id } = foundUser;
  const userRefreshToken = await authService.getRefreshTokenByUserId(_id);
  // 결국 Access Token은 Refresh Token이 새로 발급 되든,
  // 기존의 것을 유지 하든지 간에 새로운 Access Token을 발급해야 하므로,,,
  const userAccessToken = await authService.createAccessTokenRequest(_id);

  tokenObject.refreshToken = userRefreshToken;
  tokenObject.accessToken = userAccessToken;

  return tokenObject;
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
