import nodemailer from "nodemailer";
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from "./environment";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (to: string, content: string) => {
  if (!to) {
    throw new Error("No recipients defined");
  }

  const mailOptions = {
    from: `Open AI`,
    to,
    subject: "You reached the limit of your balance",
    html: content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.info("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendEmail };
