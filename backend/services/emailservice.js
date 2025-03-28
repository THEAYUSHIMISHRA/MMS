// import { createTransport } from "nodemailer";

// export const sendEmail = async (recipientEmail, subject, message) => {
//     try {
//         const transporter = createTransport({
//             service: "gmail",
//             port: 587,
//             secure: false,
//             auth: {
//                 user: "himanidobriyal8@gmail.com",  // Your Gmail account
//                 pass: "hoshppyjahctbxbd",           // App-specific password
//             },
//         });

//         const mailOptions = {
//             from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
//             to: recipientEmail,
//             subject: "WELCOME TO MENTOR MENTEE PORTAL",
//             html: '<h1>Congratulation</h1><h1>You successfully LOGGED IN</h1>',
//         };


//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent: " + info.response);
//         return { success: true, info };
//     } catch (error) {
//         console.error("Error sending email:", error);
//         return { success: false, error };
//     }
// };



import nodemailer from "nodemailer";

// 💌 Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,     // Your email address
        pass: process.env.EMAIL_PASSWORD      // Your email password or app password
    }
});

// 📩 Send Email (Reusable Function)
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw error;
    }
};

// 👨‍🏫 Send Teacher Email
export const sendTeacherEmail = async (email) => {
    const subject = "Teacher Login Confirmation";
    const message = `Dear Teacher,\n\nYou have successfully signed in. If this wasn't you, please contact support immediately.\n\nRegards,\nAdmin`;

    await sendEmail(email, subject, message);
};

// 🎓 Send Student Email
export const sendStudentEmail = async (email) => {
    const subject = "Student Login Confirmation";
    const message = `Dear Student,\n\nYou have successfully signed in. If this wasn't you, please contact support immediately.\n\nRegards,\nAdmin`;

    await sendEmail(email, subject, message);
};

// 👑 Send Admin Sign-In Email (NEW SERVICE)
export const sendAdminEmail = async (email) => {
    const subject = "Admin Sign-In Notification";
    const message = `Dear Admin,\n\nYou have successfully signed in. If this wasn't you, please take immediate action.\n\nRegards,\nSecurity Team`;

    await sendEmail(email, subject, message);
};
