import validatorModelHelper from "../helpers/validator.model.helper";
import APIErrorHandler from "../helpers/error.helper";
import utilFunc from "../utils/func";

/**
 * Parameter validation middleware
 * Body Validation middleware와 마찬가지로 Closure를 활용한 target paramter를 받는다.
 * @param {string} target Validation을 적용할 ValidationModelHelper의 Key
 */
function paramValidation(target) {
  return function (req, res, next) {
    // Parameter의 key 검증
    // Parameter의 key와 검증 모델의 Key는 반드시 동일해야 한다.
    const requestParam = req.params;
    const isValidParameter = Object.keys(requestParam).every((param) =>
      utilFunc.keyIn(param, validatorModelHelper[target])
    );
    // Parameter 검증이 틀린 경우 400번 요청 에러
    // Status: 400
    if (!isValidParameter) {
      const errorHandler = new APIErrorHandler(
        `${target} parameter validation error!`,
        400
      );
      const { status, msg } = errorHandler;
      return res.status(status).send(msg);
    }
    // Joi Schema로 변환 후 validate 검증
    // Schema의 검증 후 틀린 경우 클라이언트의 요청 에러
    // Status: 400
    const { error } = validatorModelHelper
      .asJoiSchema(target)
      .validate(requestParam);
    if (error) {
      const errorHandler = new APIErrorHandler(
        `${target} param Joi Validation Schema error!`,
        400
      );
      const { status, msg } = errorHandler;
      return res.status(status).send(msg);
    }
    next();
  };
}

export default paramValidation;
