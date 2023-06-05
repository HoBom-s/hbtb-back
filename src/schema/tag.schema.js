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
     * Tag를 눌렀을 때 이동될 Path 정의
     */
    path: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    /**
     * Tag가 눌려졌을 때 증가할 Count 값
     * 이후 대시보드에서 모니터링할 때 필요할 값
     */
    count: {
      type: Number,
      default: 0,
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
export { TagSchema, TagModel };
