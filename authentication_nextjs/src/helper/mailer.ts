import nodemailer from "nodemailer";
import User from "@/models/usermodel.js";
import bcrypt from "bcryptjs";

export const sendmail = async ({ email, emailType, userId }: any) => {
  try {
    // creasting hashed token
    const Hashedtoken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        VerifyToken: Hashedtoken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET  ") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: Hashedtoken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport =  nodemailer.createTransport({
       'host' : 'sandbox.smtp.mailtrap.io',
        'port' : 2525,
        'username' : 'cdca3156754fe2',
        'password' :'****8432',
        'className' : 'Smtp'
    })
    const MailOptions={
      from:"nh1750501@gmail.com",
      to:email,
      subject:emailType==="VERIFY"? "Verify your Email":"Reset your Password",
      html:`<p>Click <a href =${process.env.domain}/verifyemail?token=${Hashedtoken}">Here </a> to ${emailType==="VERIFY"? "Verify your Email":"Reset your Password"}</p>`
    }
    const mailresponse = await transport.sendMail(MailOptions);
        return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
