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
    //  var transport = nodemailer.createTransport({
    //         host: process.env.MAILTRAP_HOST,
    //         port: parseInt(process.env.MAILTRAP_PORT!),
    //         auth: {
    //             user: process.env.MAILTRAP_USER,
    //             pass: process.env.MAILTRAP_PASS,
    //         },
    //     });
    console.log("--- Preparing to send email ---");
    console.log("Mailtrap Host:", process.env.MAILTRAP_HOST);
    console.log("Mailtrap User:", process.env.MAILTRAP_USER);

    console.log("Mailtrap Pass exists:", !!process.env.MAILTRAP_PASS);

    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT!),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    console.log("Nodemailer transport created successfully.");
    const MailOptions = {
      from: "nh1750501@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: `<p>Click <a href =${
        process.env.domain
      }/verifyemail?token=${Hashedtoken}">Here </a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      }</p>`,
    };

    const mailresponse = await transport.sendMail(MailOptions);
    console.log("Email sent Successfully ");
    return mailresponse;
  } catch (error: any) {
    console.error("!!! FAILED TO SEND EMAIL !!!", error);
    throw new Error(error.message);
  }
};
