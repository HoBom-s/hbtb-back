import Joi from "joi";
import is from "../utils/is";
import APIErrorHandler from "./error.helper";

/**
 * Request Body Data Model
 * 사용자로부터 넘어온 Request body 값을 검증하기 위한 모델 Object
 */
const validatorModelHelper = {
  // User Create
  user: {
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    profileImg: Joi.string().required(),
    role: Joi.string().required(),
    introduction: Joi.string().required(),
  },
  // User Login
  userLogin: {
    nickname: Joi.string().required(),
    password: Joi.string().required(),
  },
  // User Update
  userUpdate: {
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    profileImg: Joi.string().required(),
    role: Joi.string().required(),
    introduction: Joi.string().required(),
  },
  // User Delete
  userDelete: {
    _id: Joi.string().required(),
  },

  // Article Create
  article: {
    thumbnail: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    contents: Joi.string().required(),
    tags: Joi.array().required(),
    writers: Joi.array().required(),
    path: Joi.string().required(),
  },
  //Article Update
  articleUpdate: {
    thumbnail: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    contents: Joi.string().required(),
    tags: Joi.array().required(),
    writers: Joi.array().required(),
    path: Joi.string().required(),
  },
  //Article Delete
  articleDelete: {
    _id: Joi.string().required(),
  },

  // Tag Create
  tag: {
    title: Joi.string().required(),
    path: Joi.string().required(),
  },
  // Tag Update
  tagUpdate: {
    _id: Joi.string().required(),
    title: Joi.string().required(),
    path: Joi.string().required(),
    count: Joi.number().min(0).required(),
  },
  // Tag Delete
  tagDelete: {
    _id: Joi.string().required(),
  },

  // Category Create
  category: {
    title: Joi.string().required(),
    path: Joi.string().required(),
    sortIndex: Joi.number().positive().required(),
    spot: Joi.string().min(1).max(1).required(),
  },
  // Category Update
  categoryUpdate: {
    _id: Joi.string().required(),
    title: Joi.string().required(),
    path: Joi.string().required(),
    sortIndex: Joi.number().required(),
    spot: Joi.string().min(1).max(1).required(),
  },
  // Category Delete
  categoryDelete: {
    _id: Joi.string().required(),
  },
};

/**
 * 검증 모델로 변환 후 Joi Object Schema 리턴
 * Joi Object를 활용하여 Joi.object.validate 검증 시작
 * @param {string} target validatorModelHelper의 Target Model
 * @returns {Joi} Joi Object로 변환된 Object
 */
validatorModelHelper.asJoiSchema = function (target) {
  if (!is.isString(target)) {
    const errorHandler = new APIErrorHandler(`${target} param type error`, 500);
    throw new Error(
      `Message: ${errorHandler.msg}, Status: ${errorHandler.status}`
    );
  }
  const joiSchema = Joi.object(validatorModelHelper[target]);
  return joiSchema;
};

Object.freeze(validatorModelHelper);
export default validatorModelHelper;
