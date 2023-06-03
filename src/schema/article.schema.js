import mongoose from "mongoose";
import UserModel from "./user.schema";
import TagModel from "./tag.schema";

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
     * Article thumbnail
     */
    thumbnail: {
      type: String,
      default: "",
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
     * Article Sub Title (Description under each title)
     */
    subTitle: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    /**
     * Article temporary contents schema
     */
    contents: {
      type: String,
      required: true,
      default: "Temp article contents",
    },

    /**
     * Article tags(Tag Collection) - populate
     */
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: TagModel,
      },
    ],

    /**
     * Article writer(User Collection) - populate
     */
    writers: [
      {
        type: Schema.Types.ObjectId,
        ref: UserModel,
      },
    ],

    /**
     * Article path - when clicking title
     */
    path: {
      type: String,
      required: true,
    },

    /**
     * Article first create date
     */
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
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
export { ArticleSchema, ArticleModel };
