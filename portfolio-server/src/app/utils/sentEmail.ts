import nodemailer from "nodemailer";
import config from "../config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async (name: string,email:string, subjectLine: string, message: string) => {
    console.log(name,email, subjectLine, message);
  const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: Number(config.smtp.port),
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
} as SMTPTransport.Options);

  const htmlTemplate = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">📬 Message from Rakib's Portfolio</h2>
        </div>
        <div style="padding: 20px; color: #334155; font-size: 16px; line-height: 1.6;">
          <p><strong>Hello,</strong></p>
          <p><strong>I am ${name}</strong></p>
          <p>${message}</p>
          <p>Thanks for reaching out! I’ll get back to you as soon as possible.</p>
        </div>
        <div style="padding: 20px; background-color: #f1f5f9; text-align: center; color: #64748b; font-size: 14px;">
          <p>Best Regards,<br><strong>Rakib Mia</strong><br>Web Developer | Portfolio</p>
          <p style="margin-top: 10px;">
            <a href="https://your-portfolio-link.com" style="color: #0ea5e9; text-decoration: none;">Visit My Portfolio</a>
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Rakib mia - Portfolio" <rkrakibhasan680@gmail.com>`,
    to:email,
    subject: subjectLine,
    text: message,
    html: htmlTemplate,
  });
};
