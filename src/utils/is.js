/**
 * Type Assert
 * 타입 확정 function module
 */
const is = {
  /**
   * string 검사
   * @param {string} target
   * @returns {boolean}
   */
  isString: function (target) {
    if (typeof target !== "string") return false;
    return true;
  },

  /**
   * number 검사
   * @param {number} target
   * @returns {boolean}
   */
  isNumber: function (target) {
    if (typeof target !== "number") return false;
    return true;
  },

  /**
   * boolean 검사
   * @param {boolean} target
   * @returns {boolean}
   */
  isBoolean: function (target) {
    if (typeof target !== "boolean") return false;
    return true;
  },

  /**
   * Array 검사
   * @param {Array} target
   * @returns {boolean}
   */
  isArray: function (target) {
    return Array.isArray(target);
  },
};

Object.freeze(is);
export default is;
