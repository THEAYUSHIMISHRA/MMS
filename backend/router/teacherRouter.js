import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { Teacher } from "../models/teacherSchema.js";
import { getAllTeachers, createTeacher } from "../controllers/teacherController.js";

const router = express.Router();

// Multer Configuration (Only Accept CSV)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== ".csv") {
            return cb(new Error("Only CSV files are allowed"));
        }
        cb(null, true);
    }
});

// 🚀 Upload CSV & Add Teachers to DB
router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) 
        return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");

    Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            console.log("Parsed CSV Data:", results.data);

            if (results.data.length === 0) {
                return res.status(400).json({ message: "CSV file is empty or invalid" });
            }

            try {
                const teachersToInsert = [];
                const errors = [];

                for (const row of results.data) {
                    const { name, email, phno, subject, password } = row;

                    if (!name || !email || !phno || !subject || !password) {
                        errors.push(`Missing required fields in row: ${JSON.stringify(row)}`);
                        continue;
                    }
                    const phoneNumber = String(phno).trim();
                    // Check if teacher already exists
                    const existingTeacher = await Teacher.findOne({
                        $or: [{ email }]
                    });

                    if (existingTeacher) {
                        errors.push(`Teacher already exists: Email: ${email}`);
                        continue;
                    }

                    teachersToInsert.push({ name, email, phno, subject, password });
                }

                if (teachersToInsert.length > 0) {
                    await Teacher.insertMany(teachersToInsert);
                }

                fs.unlinkSync(filePath); // Remove file after processing

                return res.status(200).json({
                    message: "Teachers uploaded successfully",
                    errors
                });

            } catch (error) {
                console.error("Error saving teachers:", error);
                return res.status(500).json({ message: "Error saving teachers", error });
            }
        }
    });
});

// 🏫 Fetch All Teachers
router.get('/getall', getAllTeachers);

export default router;
