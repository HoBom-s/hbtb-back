import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    process.env.AUTH_SECRET_PRIVATE_KEY,
    {
      expiresIn: "1h",
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
    process.env.AUTH_SECRET_PRIVATE_KEY,
    {
      expiresIn: "3d",
    }
  );

  const tokenObj = {};
  tokenObj.refreshToekn = createdRefreshAuthToken;

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
  const errorObject = {};
  const verifiedRefreshAuthToken = jwt.verify(
    token,
    process.AUTH_SECRET_REFRESH_PRIVATE_KEY,
    (error) => {
      if (error) {
        errorObject.name = error.name;
        errorObject.message = error.message;
        errorObject.expiredAt = error.expiredAt;
        errorObject.hasError = true;
      }
    }
  );
  if (errorObject.hasError) {
    return errorObject;
  }
  if (_id === verifiedRefreshAuthToken._id) {
    return true;
  }
  return false;
};

Object.freeze(authHelper);
export default authHelper;
