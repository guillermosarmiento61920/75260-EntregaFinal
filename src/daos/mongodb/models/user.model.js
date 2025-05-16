// user.model.js
import mongoose, { Schema, model } from "mongoose";
// import { userController } from "../../..userController.js";

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {type: String, unique: true},
  age: { type: Number, required: true },
  password: {type: String, required: true},
  cart: {type: Schema.Types.ObjectId, ref: "Cart", default: null},
  role: { type: String, required: true, default: 'user' },
  // isGithub: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  // isGoogle: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
});

export const UserModel = model("user", UserSchema);

