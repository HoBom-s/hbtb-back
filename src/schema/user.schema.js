import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  /**
   * User UUID
   */
  _id: {
    type: String,
    required: true,
  },

  /**
   * User nickname
   */
  nickname: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * User password
   */
  password: {
    type: String,
    required: true,
    trim: true,
  },

  /**
   * User profile image
   */
  profileImg: {
    type: String,
    default: "",
  },

  /**
   * User role: admin
   */
  role: {
    type: String,
    required: true,
  },

  /**
   * User introduction (about User)
   */
  introduction: {
    type: String,
    required: true,
    default: "Introduce myself",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
