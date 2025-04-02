// // const nodemailer = require("nodemailer");

// // const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //     },
// // });

// // module.exports = transporter;


// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

// export { transporter };  // Named export


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Named export
export { transporter };  
