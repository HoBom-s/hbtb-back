import validatorModelHelper from "../helpers/validator.model.helper";
import APIErrorHandler from "../helpers/error.helper";
import utilFunc from "../utils/func";

/**
 * Closure를 활용한 param validation middleware 작성
 * Validation을 적용할 target을 Parameter로 전달받기 위해 Closure 활용
 * @param {string} target validation을 적용할 Validation Model Object 의 Key값
 */
function bodyValidation(target) {
  return function (req, res, next) {
    const requestBody = req.body;
    // Body의 key 검증
    // Body의 key와 검증 모델의 Key는 반드시 동일해야 한다.
    const isValidBody = Object.keys(requestBody).every((body) =>
      utilFunc.keyIn(body, validatorModelHelper[target])
    );
    // Body의 검증이 틀린 경우 클라이언트의 요청 에러
    // Status: 400
    if (!isValidBody) {
      const errorHandler = new APIErrorHandler(
        `${target} body validation error!`,
        400
      );
      return res.status(errorHandler.status).send(errorHandler.msg);
    }
    // Joi Schema로 변환 후 validate 검증
    // Schema 검증이 틀린 경우 클라이언트의 요청 에러
    // Status: 400
    const { error } = validatorModelHelper
      .asJoiSchema(target)
      .validate(validatorModelHelper[target]);
    if (error) {
      const errorHandler = new APIErrorHandler(
        `${target} body Joi Validation Schema error!`,
        400
      );
      return res.status(errorHandler.status).send(errorHandler.msg);
    }
    next();
  };
}

export default bodyValidation;
