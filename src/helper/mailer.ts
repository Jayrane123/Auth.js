import User from "@/model/usermodel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);   
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { $set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      }   
      });
      
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { $set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    // Looking to send emails in production? Check out our Email API/SMTP product!

    const mailOption = {
      from: "jay@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY"
          ? "email succefully register"
          : "not verify please Register for the same",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}.
            If the link doesn't work, copy and paste the following URL into your browser:
            <br> ${process.env.DOMAIN}/verifymail?token=${hashedToken}
            </p>`,
// html body
    };

    const mailInfo = await transport.sendMail(mailOption);
    console.log("Email sent successfully:", mailInfo.messageId);
    return mailInfo;
  } catch (error) {
    console.error("Error in sendEmail function:", error); // Log the error
    throw new Error("Failed to send email");
  }
};
