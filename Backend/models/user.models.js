import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  fullName:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    default: null,
  },
});

// Instance Method: generateAuthToken
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

// Instance Method: comparePassword
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static Method: hashPassword
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Create and export the model
const User = mongoose.model("user", userSchema);
export default User;
