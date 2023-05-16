import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Define Blog Post Article Schema
 * Blog 포스트에 사용될 기본 Article Schema 정의
 */
const ArticleSchema = new Schema(
  {
    /**
     * Article UUID
     */
    _id: {
      type: String,
      required: true,
    },

    /**
     * Article Main Title
     */
    title: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    /**
     * Article Sub Title
     */
    subTitle: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    /**
     * Article related tag
     * Type: Array of Maps
     */
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    /**
     * Article first create date
     */
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    /**
     * Article update date
     */
    updatedAt: {
      type: Date,
      required: false,
      default: "",
    },
  },
  { versionKey: false }
);

const ArticleModel = mongoose.model("Article", ArticleSchema);
export default ArticleModel;
