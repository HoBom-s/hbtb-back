import authHelper from "../helpers/auth.helper";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Auth validation with JSON WEB TOKEN
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function authValidation(req, res, next) {
  try {
    // Authorization 인증의 Bearer를 가져와야만 한다.
    const token = req.headers["authorization"].split("Bearer ")[1];
    if (!token) {
      // Access Token이 없는 경우,,
      const errorHandler = new APIErrorHandler("The token is not exist!", 401);
      return res.status(errorHandler.status).send(errorHandler.msg);
    }
    // AuthHelper를 활용한 Access Token 검증
    const verifiedPayload = authHelper.verifyAccessAuthToekn(token);
    if (!verifiedPayload) {
      const errorHandler = new APIErrorHandler(
        "The token can't verified!",
        401
      );
      return res.status(errorHandler.status).send(errorHandler.msg);
    }
    req.userId = verifiedPayload;
    next();
  } catch (error) {
    const { message } = error;
    const errorHandler = new APIErrorHandler(message, 401);
    return res.status(errorHandler.status).send(errorHandler.msg);
  }
}

export default authValidation;
