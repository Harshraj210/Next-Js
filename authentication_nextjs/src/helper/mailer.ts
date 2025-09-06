import nodemailer from "nodemailer";
import User from "@/models/usermodel.js";
import bcrypt from "bcryptjs";

export const sendmail = async ({ email, emailType, userId }: any) => {
  try {
    // creasting hashed token
    const Hashedtoken = await bcrypt.hash(userId.toString(), 10);
    await User.findByIdAndUpdate(userId, {
      VerifyToken: Hashedtoken,
      verifyTokenExpiry: Date.now() + 3600000,
    });
  } catch (error: any) {
    throw new error(error.message);
  }
};
