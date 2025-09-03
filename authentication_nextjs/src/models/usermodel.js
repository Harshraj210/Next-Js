import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
  // Blueprints
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide Username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  VerifyToken: String,
  verifyTokenExpiry: Date,
});
// creating the user in moongose memory,if user user exists use previous one or create new one
const User = mongoose.models.users || mongoose.model("users", Userschema);
export default User;
