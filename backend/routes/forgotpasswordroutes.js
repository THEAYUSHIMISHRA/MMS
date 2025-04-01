import express from 'express';
import { generateOTP, sendOTP } from '../services/otpservice.js'; // Ensure otpservice.js is in the correct path
import { User } from '../models/userModel.js'; // Assuming you have a User model for your database
import bcrypt from 'bcryptjs'; // For password hashing

const router = express.Router();

let currentOTP = ""; // Temporarily store the OTP

// Request OTP for password reset
router.post('/request-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP and send it to the user's email
        currentOTP = generateOTP();
        await sendOTP(email, currentOTP);

        return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error during OTP generation and sending:', error);
        return res.status(500).json({ message: 'Server error, please try again' });
    }
});

// Verify OTP for password reset
router.post('/verify-otp', async (req, res) => {
    const { otp, email, newPassword } = req.body;

    if (!otp || !email || !newPassword) {
        return res.status(400).json({ message: 'OTP, email, and new password are required' });
    }

    // Check if the provided OTP matches the generated OTP
    if (otp !== currentOTP) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Update password with the new hashed one
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(500).json({ message: 'Server error, please try again' });
    }
});

export default router;
