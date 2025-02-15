import express from "express";
import { getAllStudents, createStudent } from "../controllers/studentController.js";
import { sendEmail } from "../services/emailservice.js";

const router = express.Router();

// Get all students
router.get('/getall', getAllStudents);

// Create a student
router.post('/', createStudent);

// Student Login - Email Sending Functionality
router.post("/student-login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ status: 401, message: "Email and Password are required" });
    }

    try {
        await sendEmail(email);
        res.status(201).json({ status: 201, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 500, message: "Failed to send email" });
    }
});

export default router;
