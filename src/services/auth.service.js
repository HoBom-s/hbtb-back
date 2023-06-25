import { v4 as uuid4 } from "uuid";
import AuthModel from "../schema/auth.schema";
import authHelper from "../helpers/auth.helper";

const authService = {};

authService.createAccessTokenRequest = function (userId) {
  const createdAccessToken = authHelper.createAccessAuthToken(userId);
  const { accessToken } = createdAccessToken;
  return accessToken;
};

authService.createRefreshTokenRequest = async function (userId) {
  const createdRefreshToken = authHelper.createRefreshAuthToken(userId);
  const { refreshToken } = createdRefreshToken;

  const createdAuthSchema = await AuthModel.create({
    _id: uuid4(),
    userId: userId,
    token: refreshToken,
    createdAt: new Date(),
  });

  return createdAuthSchema;
};

authService.verifyRefreshTokenByUserId = function (userId, token) {
  const tokenInformation = authHelper.verifyRefreshAuthToken(userId, token);
  if (tokenInformation) {
    return tokenInformation;
  } else {
    return null;
  }
};

authService.getRefreshTokenByUserId = async function (userId) {
  const found = await AuthModel.findOne({ userId: userId }).exec();

  // 사용자가 Refresh 토큰을 가지고 있지 않은 경우
  if (!found) {
    const createdUserRefreshToken = await this.createRefreshTokenRequest(
      userId
    );
    const { token } = createdUserRefreshToken;
    return token;
  }

  // 사용자가 Refresh 토큰을 가지고 있는 경우
  const { token } = found;
  const refreshTokenInformation = this.verifyRefreshTokenByUserId(
    userId,
    token
  );
  if (!refreshTokenInformation) {
    // 검증에 실패한다면 다시 Refresh Token 생성
    // 기존의 Refresh Token을 삭제 후, 새로 생성해야만 한다.
    await AuthModel.deleteOne({
      userId: userId,
    });
    const createdRefreshToken = await this.createRefreshTokenRequest(userId);
    return createdRefreshToken.token;
  } else {
    // 검증에 성공한다면 그대로 Refresh Token 반환
    return token;
  }
};

Object.freeze(authService);
export default authService;
