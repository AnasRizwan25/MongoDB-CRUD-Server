import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
  },
  { timestamps: true }
);

const User = mongoose.model("UserData", userSchema);

export default User;
