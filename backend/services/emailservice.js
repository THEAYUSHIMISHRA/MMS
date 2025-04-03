import { createTransport } from "nodemailer";

// Email Transporter Configuration
const transporter = createTransport({
    service: "gmail",
    port: 587,
    secure: false, // TLS
    auth: {
        user: "mentor.mentee.banasthali@gmail.com",  // Your Gmail account
        pass: "qsmk fceh oeof czjf"            // App-specific password
    }
});

// 🔹 Enhanced Email Template
const getEmailTemplate = (title, message, role, link) => `
    <div style="
        font-family: 'Arial', sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 10px;
        background-color: rgb(29, 70, 111);
        color: white;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    ">
        <!-- BANASTHALI VIDYAPEETH -->
        <h1 style="font-size: 28px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; color: #f1c40f;">
            BANASTHALI VIDYAPEETH
        </h1>
        
        <!-- Welcome Message -->
        <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 10px;">
            Welcome to <span style="color: #f1c40f;">MENTOR MENTEE SYSTEM</span>
        </h2>

        <p style="font-size: 18px; line-height: 1.5; color: #f2f2f2;">${message}</p>
        
        <!-- CTA Button -->
        <div style="margin: 20px 0;">
            <a href="${link}" 
                style="
                    display: inline-block;
                    background-color: white;
                    color: rgb(29, 70, 111);
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: bold;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: 0.3s ease;
                " >
                Go to Portal
            </a>
        </div>

        <p style="font-size: 14px; margin-top: 15px; color: white;">
            You are logged in as a <strong>${role}</strong>.
        </p>

        <hr style="border: 1px solid #ffffff33; margin: 20px 0;">

        <!-- Footer -->
        <div style="text-align: center; font-size: 14px; color: #bbbbbb;">
            <p>Email: <a href="mailto:deanadmin@banasthali.ac.in" style="color: #f1c40f; text-decoration: none;">deanadmin@banasthali.ac.in</a></p>
            <p>Contact: <a href="tel:+911438228456" style="color: #f1c40f; text-decoration: none;">01438-228456</a></p>
            <p style="margin-top: 10px; font-size: 12px;">© 2025 Banasthali Vidyapith. All rights reserved.</p>
        </div>
    </div>
`;

// Send Student Email
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

// Send Admin Email
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
