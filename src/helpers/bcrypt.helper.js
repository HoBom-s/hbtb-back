import bcrypt from "bcrypt";
import dotenv from "dotenv";
import APIErrorHandler from "./error.helper";
import is from "../utils/is";

dotenv.config();

/**
 * Bcrypt Helper 정의
 */
class BcryptHelper {
  constructor() {
    this.salt = Number.parseInt(process.env.BCRYPT_SALT);
  }

  /**
   * 넘겨받은 Value에 Hash 알고리즘 적용
   *
   * @param {string} value
   * @returns {string}
   */
  applyHash(value) {
    if (!is.isString(value))
      throw new APIErrorHandler("The value is not a string", 404);

    const hashed = bcrypt.hashSync(value, this.salt);
    return hashed;
  }

  /**
   * Hash알고리즘이 적용된 값과 같은지 비교하는 함수
   *
   * @param {string} target 비교하고자 하는 값. 보통 Request 값
   * @param {string} origin Hash 알고리즘이 적용된 값
   * @returns {boolean}
   */
  compareHash(target, origin) {
    if (!is.isString(target))
      throw new APIErrorHandler("The target is not a string", 404);
    if (!is.isString(origin))
      throw new APIErrorHandler("The origin is not a string", 404);

    const isSameValue = bcrypt.compareSync(target, origin);
    return isSameValue;
  }
}

Object.freeze(BcryptHelper);
export default BcryptHelper;
