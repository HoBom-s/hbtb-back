import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Define Blog Category
 * Category의 정보를 가지고 있는 Schema 정의
 */
const CategorySchema = new Schema(
  {
    /**
     * Category UUID
     */
    _id: {
      type: String,
      required: true,
    },

    /**
     * Category title
     * Category의 이름
     * Max Length: 16
     */
    title: {
      type: String,
      required: true,
      trim: true,
      default: "",
      maxLength: 16,
    },

    /**
     * Category를 눌렀을 때 이동될 Path
     */
    path: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    /**
     * 카테고리 정렬 기준
     * 시작: 1 부터 시작
     */
    sortIndex: {
      type: Number,
      required: true,
      default: 1,
    },

    /**
     * Category 최초 생성 날짜
     */
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    /**
     * Category 수정 날짜
     * 처음 만들어진 경우에는 최초 생성 날짜로 지정
     */
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
