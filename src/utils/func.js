/**
 * Util Function 함수를 정의한 Object
 *
 * Object util
 * Array util
 * etc...
 */
const utilFunc = {
  // Object
  keyIn: (key, obj) => {
    return key in obj;
  },

  // Array
  removeDuplicate: (arr1, arr2) => {
    return arr1.filter((v, idx) => arr2.indexOf(v) === idx);
  },

  // asyncForEach: (arr, cb) => {
  //   for (const el of arr) {
  //     return cb(el);
  //   }
  // },

  asyncForEach: (arr, cb) => {
    Array.from({ length: arr.length }, (v, idx) => idx);
  },
};

Object.freeze(utilFunc);
export default utilFunc;
