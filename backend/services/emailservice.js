import { createTransport } from "nodemailer";

export const sendEmail = async (recipientEmail, subject, message) => {
    try {
        const transporter = createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "himanidobriyal8@gmail.com",  // Your Gmail account
                pass: "hoshppyjahctbxbd",           // App-specific password
            },
        });

        const mailOptions = {
            from: '"Mentor-Mentee Portal" <himanidobriyal8@gmail.com>',
            to: recipientEmail,
            subject: "WELCOME TO MENTOR MENTEE PORTAL",
            html: '<h1>Congratulation</h1><h1>You successfully LOGGED IN</h1>',
        };


        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
