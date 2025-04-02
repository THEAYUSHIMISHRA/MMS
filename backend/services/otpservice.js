// // const crypto = require("crypto");
// // const transporter = require("../config/nodemailer");

// // const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// // const sendOTP = async (email, otp) => {
// //     const mailOptions = {
// //         from: process.env.EMAIL_USER,
// //         to: email,
// //         subject: "Password Reset OTP",
// //         text: `Your OTP is: ${otp}`,
// //     };

// //     await transporter.sendMail(mailOptions);
// // };

// // module.exports = { generateOTP, sendOTP };



// import crypto from 'crypto';
// import transporter from '../config/nodemailer.js'; // Assuming nodemailer is using ES Modules

// const generateOTP = () => {
//     return crypto.randomInt(100000, 999999).toString();
// };

// const sendOTP = async (email, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Password Reset OTP",
//         text: `Your OTP is: ${otp}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         throw new Error('Error sending OTP');
//     }
// };

// export { generateOTP, sendOTP };  // Export as named exports


import { transporter } from '../config/nodemailer.js'; // Named import
import crypto from 'crypto';

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Error sending OTP');
    }
};

export { generateOTP, sendOTP };  // Named export
