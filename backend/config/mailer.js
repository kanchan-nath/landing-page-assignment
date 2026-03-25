import dotenv from "dotenv";
dotenv.config();

import nodemailer from 'nodemailer';
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: `"Landing Page" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; background: #0F172A; color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: #10B981; padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Landing Page </h1>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="margin: 0 0 8px; font-size: 20px;">Hello, ${name}</h2>
          <p style="color: #94a3b8; margin: 0 0 32px; font-size: 15px;">Use the code below to verify your account. This code expires in 10 minutes.</p>
          <div style="background: #1E293B; border-radius: 10px; padding: 24px; text-align: center; margin-bottom: 32px;">
            <span style="font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #10B981;">${otp}</span>
          </div>
          <p style="color: #64748b; font-size: 13px; margin: 0;">If you didn't register, you can safely ignore this email.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default transporter;
