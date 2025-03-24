import { Teacher } from "../models/teacherSchema.js";

// 📥 Fetch all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ success: true, teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch teachers", error });
    }
};

// ➕ Create a single teacher manually (if needed)
export const createTeacher = async (req, res) => {
    try {
        const { name, email, phno, subject, password } = req.body;

        if (!name || !email || !phno || !subject || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({ success: false, message: "Teacher already exists" });
        }

        const newTeacher = new Teacher({ name, email, phno, subject, password });
        await newTeacher.save();

        res.status(201).json({ success: true, message: "Teacher added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding teacher", error });
    }
};
