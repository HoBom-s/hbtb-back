import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Define Blog Post Article Tag
 * Blog 포스트에 사용되거나 Tag 목록에 사용될 Schema 정의
 */
const TagSchema = new Schema(
  {
    /**
     * Article Tag UUID
     */
    _id: {
      type: String,
      required: true,
    },

    /**
     * Article tag title
     * Tag에 사용될 Tag title
     * Max Length: 24
     */
    title: {
      type: String,
      required: true,
      trim: true,
      default: "",
      maxLength: 24,
    },

    /**
     * Tag first create date
     */
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const TagModel = mongoose.model("Tag", TagSchema);
export default TagModel;
