// // import { createTransport } from "nodemailer";

// // export const sendEmail = async (recipientEmail, subject, message) => {
// //     try {
// //         const transporter = createTransport({
// //             service: "gmail",
// //             port: 587,
// //             secure: false,
// //             auth: {
// //                 user: "himanidobriyal8@gmail.com",  // Your Gmail account
// //                 pass: "hoshppyjahctbxbd",           // App-specific password
// //             },
// //         });

// //         const mailOptions = {
// //             from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
// //             to: recipientEmail,
// //             subject: "WELCOME TO MENTOR MENTEE PORTAL",
// //             html: '<h1>Congratulation</h1><h1>You successfully LOGGED IN</h1>',
// //         };


// //         const info = await transporter.sendMail(mailOptions);
// //         console.log("Email sent: " + info.response);
// //         return { success: true, info };
// //     } catch (error) {
// //         console.error("Error sending email:", error);
// //         return { success: false, error };
// //     }
// // };



// import nodemailer from "nodemailer";

// // 💌 Email Transporter Configuration
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,     // Your email address
//         pass: process.env.EMAIL_PASSWORD      // Your email password or app password
//     }
// });

// // 📩 Send Email (Reusable Function)
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to,
//         subject,
//         text
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to ${to}`);
//     } catch (error) {
//         console.error(`Failed to send email to ${to}:`, error);
//         throw error;
//     }
// };

// // 👨‍🏫 Send Teacher Email
// export const sendTeacherEmail = async (email) => {
//     const subject = "Teacher Login Confirmation";
//     const message = `Dear Teacher,\n\nYou have successfully signed in. If this wasn't you, please contact support immediately.\n\nRegards,\nAdmin`;

//     await sendEmail(email, subject, message);
// };

// // 🎓 Send Student Email
// export const sendStudentEmail = async (email) => {
//     const subject = "Student Login Confirmation";
//     const message = `Dear Student,\n\nYou have successfully signed in. If this wasn't you, please contact support immediately.\n\nRegards,\nAdmin`;

//     await sendEmail(email, subject, message);
// };

// // 👑 Send Admin Sign-In Email (NEW SERVICE)
// export const sendAdminEmail = async (email) => {
//     const subject = "Admin Sign-In Notification";
//     const message = `Dear Admin,\n\nYou have successfully signed in. If this wasn't you, please take immediate action.\n\nRegards,\nSecurity Team`;

//     await sendEmail(email, subject, message);
// };
import { createTransport } from "nodemailer";

//  Email Transporter Configuration
const transporter = createTransport({
    service: "gmail",
    port: 587,
    secure: false,                  // TLS
    auth: {
        user: "himanidobriyal8@gmail.com",  // Your Gmail account
        pass: "hoshppyjahctbxbd"            // App-specific password
    }
});

// HTML Template Generator
const getEmailTemplate = (title, message, role, link) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">${title}</h2>
        <p style="font-size: 18px; color: #555;">${message}</p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" 
                style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Go to Portal
            </a>
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">You are logged in as a <strong>${role}</strong>.</p>
        <hr style="border: 1px solid #ccc; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">If you didn't sign in, please contact support immediately.</p>
    </div>
`;

// send Student Email
export const sendStudentEmail = async (recipientEmail) => {
    try {
        const mailOptions = {
            from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
            to: recipientEmail,
            subject: "Welcome to Mentor-Mentee Portal (Student)",
            html: getEmailTemplate(
                "Welcome, Student!",
                "You have successfully logged in as a Student.",
                "Student",
                "http://localhost:5173/student/dashboard"
            )
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Student Email sent: " + info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending student email:", error);
        return { success: false, error };
    }
};

// Send Teacher Email
export const sendTeacherEmail = async (recipientEmail) => {
    try {
        const mailOptions = {
            from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
            to: recipientEmail,
            subject: "Welcome to Mentor-Mentee Portal (Teacher)",
            html: getEmailTemplate(
                "Welcome, Teacher!",
                "You have successfully logged in as a Teacher.",
                "Teacher",
                "http://localhost:5173/teacher/dashboard"
            )
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Teacher Email sent: " + info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending teacher email:", error);
        return { success: false, error };
    }
};

// 👑 Send Admin Email
export const sendAdminEmail = async (recipientEmail) => {
    try {
        const mailOptions = {
            from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
            to: recipientEmail,
            subject: "Admin Sign-In Notification",
            html: getEmailTemplate(
                "Admin Sign-In Notification",
                "You have successfully signed in as an Admin. If this wasn't you, please take immediate action.",
                "Admin",
                "http://localhost:5173/admin/dashboard"
            )
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Admin Email sent: " + info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending admin email:", error);
        return { success: false, error };
    }
};
