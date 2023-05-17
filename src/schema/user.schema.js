import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
});

export default UserSchema;
