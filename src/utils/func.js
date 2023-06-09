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

  //Function
  asyncForEach: async (arr, cb) => {
    for (const el of arr) {
      await cb(el);
    }
  },

  // funcs는 함수들의 array
  invokeAll: async (funcs) => {
    const arr = Array.from({ length: funcs.length }, (v, idx) => idx);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = funcs[i];
    }
    return arr;
  },
};

Object.freeze(utilFunc);
export default utilFunc;
