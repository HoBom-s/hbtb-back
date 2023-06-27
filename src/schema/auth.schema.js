import mongoose from "mongoose";
import { SCHEMA_REFRESH_TOKEN_EXPIRE_TIME } from "../static/static.const";

const Schema = mongoose.Schema;

const AuthShema = new Schema({
  /**
   * Auth UUID
   */
  _id: {
    type: String,
    required: true,
  },

  /**
   * User UUID
   */
  userId: {
    type: String,
    required: true,
  },

  /**
   * Auth Token
   *    User's refresh token
   */
  token: {
    type: String,
    required: true,
  },

  /**
   * Refresh Token 생성 시간
   *    만료 시간: 3 days
   *    TTL: Time To Live => 3 days
   */
  createdAt: {
    type: Date,
    default: Date.now,
    expires: SCHEMA_REFRESH_TOKEN_EXPIRE_TIME,
  },
});

const AuthModel = mongoose.model("Auth", AuthShema);
export default AuthModel;
