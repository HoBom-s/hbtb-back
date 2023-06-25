import mongoose from "mongoose";

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
    expires: 3 * 86400,
  },
});

const AuthModel = mongoose.model("Auth", AuthShema);
export default AuthModel;
