// const express = require("express");
// const { generateOTP, sendOTP } = require("../services/otpservice");

// const router = express.Router();
// let currentOTP = ""; // Store OTP temporarily

// router.post("/request-otp", async (req, res) => {
//     const { email } = req.body;
//     if (!email) return res.status(400).send("Email is required");

//     currentOTP = generateOTP();
//     await sendOTP(email, currentOTP);

//     res.status(200).send("OTP sent to your email");
// });

// router.post("/verify-otp", (req, res) => {
//     const { otp } = req.body;
//     if (otp === currentOTP) {
//         res.status(200).send("OTP verified successfully");
//     } else {
//         res.status(400).send("Invalid OTP");
//     }
// });

// module.exports = router;



import express from 'express';
import { generateOTP, sendOTP } from '../services/otpservice.js'; // Make sure otpservice.js is ES Modules

const router = express.Router();
let currentOTP = ""; // Store OTP temporarily

router.post("/request-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send("Email is required");

    currentOTP = generateOTP();
    await sendOTP(email, currentOTP);

    res.status(200).send("OTP sent to your email");
});

router.post("/verify-otp", (req, res) => {
    const { otp } = req.body;
    if (otp === currentOTP) {
        res.status(200).send("OTP verified successfully");
    } else {
        res.status(400).send("Invalid OTP");
    }
});

export default router;  // Exporting as default for ES Modules
