import { v4 as uuid4 } from "uuid";
import UserModel from "../schema/user.schema";

const userService = {};

userService.findOneUserRequest = async function (nickname, role) {
  if (!nickname || !role) throw new Error("Missing parameter(s)!");
  const foundUser = await UserModel.findOne({
    nickname: nickname,
    role: role,
  });
  if (!foundUser) throw new Error("User not found!");
  return foundUser;
};

userService.createUserRequest = async function (
  nickname,
  profileImg,
  role,
  introduction
) {
  const foundUser = this.findOneUserRequest(nickname, role);
  if (foundUser) throw new Error("The user already exist!");
  const createdUser = await UserModel.create({
    _id: uuid4(),
    nickname: nickname,
    profileImg: profileImg,
    role: role,
    introduction: introduction,
  });
  return createdUser;
};

Object.freeze(userService);
export default userService;
