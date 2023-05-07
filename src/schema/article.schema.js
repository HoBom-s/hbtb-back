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
     * User information of Article
     * Type: Map
     */
    user: {
      type: Schema.Types.Map,
      of: new Schema({
        _id: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        nickname: {
          type: String,
          required: true,
        },
        kind: {
          type: String,
          required: true,
        },
      }),
      required: true,
    },

    /**
     * Article related tag
     * Type: Array of Maps
     */
    tags: {
      type: [Schema.Types.Map],
      of: new Schema({
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
          default: Date.now,
        },
      }),
      required: false,
    },

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
