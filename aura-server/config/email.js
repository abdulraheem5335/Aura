import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'theaurafashionstore@gmail.com',
    // Replace with App Password generated from Google Account
    pass: 'xbzr ztyb rlxs hkzt' // This should be your 16-character App Password
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendOTPEmail = async (email, otp) => {
  try {
    console.log('Attempting to send email to:', email);
    
    const info = await transporter.sendMail({
      from: '"AURA Fashion Store" <theaurafashionstore@gmail.com>',
      to: email,
      subject: 'Password Reset OTP - AURA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #ff4444; text-align: center;">AURA</h1>
          <h2 style="color: #333;">Password Reset</h2>
          <p>Your one-time password (OTP) for resetting your password is:</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 1 hour.</p>
        </div>
      `
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};
