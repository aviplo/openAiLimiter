"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const environment_1 = require("./environment");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: environment_1.EMAIL_ADDRESS,
        pass: environment_1.EMAIL_PASSWORD,
    },
});
const sendEmail = async (to, content) => {
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
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
