import mongoose from "mongoose";
import { UserSchema } from "./user.schema";
import { TagSchema } from "./tag.schema";

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
     * Article tags(Tag Collection)
     */
    tags: {
      type: Array,
      of: TagSchema,
    },

    /**
     * Article writer(User Collection)
     */
    writer: {
      type: Array,
      of: UserSchema,
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
