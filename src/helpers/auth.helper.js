import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} from "../static/static.const";

dotenv.config();

const authHelper = {};

/**
 * JWT Auth Access Token 생성
 *
 * @param {string} _id
 * @returns {object} Created JWT Access Token Object
 */
authHelper.createAccessAuthToken = function (_id) {
  // Access Token 생성
  const createdAccessAuthToken = jwt.sign(
    {
      _id: _id,
    },
    process.env.AUTH_SECRET_ACCESS_PRIVATE_KEY,
    {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    }
  );

  const tokenObj = {};
  tokenObj.accessToken = createdAccessAuthToken;

  return tokenObj;
};

/**
 * JWT Auth Refresh Token 생성
 *
 * @param {string} _id
 * @returns {object} Created JWT Access Token Object
 */
authHelper.createRefreshAuthToken = function (_id) {
  // Refresh Token 생성
  const createdRefreshAuthToken = jwt.sign(
    {
      _id: _id,
    },
    process.env.AUTH_SECRET_REFRESH_PRIVATE_KEY,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    }
  );

  const tokenObj = {};
  tokenObj.refreshToken = createdRefreshAuthToken;

  return tokenObj;
};

/**
 * Auth Access Token Verify
 *     전달 받은 Access Token 검증
 *     Access Token 인증에 실패할 경우 null 반환
 *
 * @param {string} token
 * @returns {string | null} User의 _id
 */
authHelper.verifyAccessAuthToekn = function (token) {
  const verifiedAuthToken = jwt.verify(
    token,
    process.env.AUTH_SECRET_PRIVATE_KEY
  );
  const _id = verifiedAuthToken._id;
  if (!_id) {
    return null;
  }
  return _id;
};

/**
 * Auth Refresh Token Verify
 *    전달 받은 Refresh Token 검증
 *
 * @param {string} _id
 * @param {string} token
 * @returns {Object | boolean}
 */
authHelper.verifyRefreshAuthToken = function (_id, token) {
  try {
    const verifiedRefreshAuthToken = jwt.verify(
      token,
      process.env.AUTH_SECRET_REFRESH_PRIVATE_KEY
    );
    const expireTime = verifiedRefreshAuthToken.exp;
    const expireDate = new Date(expireTime * 1000);
    if (_id === verifiedRefreshAuthToken._id) {
      const tokenInfo = {};
      tokenInfo.expireDate = expireDate;
      tokenInfo.authCheck = true;
      return tokenInfo;
    }
    return false;
  } catch (error) {
    return null;
  }
};

Object.freeze(authHelper);
export default authHelper;
