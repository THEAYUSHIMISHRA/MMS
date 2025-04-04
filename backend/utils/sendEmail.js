// sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
});

const sendEmail = (to, subject, html) => {
  const mailOptions = { from: process.env.EMAIL, to, subject, html };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("Email error:", error);
    else console.log("Email sent:", info.response);
  });
};

export const sendTeamRegisterEmail = (to, teamName, teamId, password ) => {
  sendEmail(to, 
    "Team Registration Successful", 
    `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2c3e50; text-align: center;">Welcome to Team ${teamName}!</h2>

      <p>You have been successfully registered in <strong>Team ${teamName}</strong>. Below are your login details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr>
            <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Team Name</th>
            <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Team ID</th>
            <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${teamName}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${teamId}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
          </tr>
        </tbody>
      </table>

      <p>Click below to join your team:</p>
      <a href="http://localhost:5173/teams/join/${teamId}" 
         style="display:inline-block; padding:10px 20px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">
         Join Team
      </a>

      <p>If you did not request this registration, please ignore this email.</p>
    </div>`
  );
};

// export const sendTeamJoinEmail = (to, teamId) => {
//   sendEmail(to, "Join Your Team", `<p>You have been invited to join a team.</p>
//                 <a href="http://localhost:5173/team/${teamId}" style="padding:10px 20px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">Join Team</a>`);
// };

export default sendEmail;