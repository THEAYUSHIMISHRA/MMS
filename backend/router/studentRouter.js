import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { getAllStudents, createStudent, getStudentCount } from "../controllers/studentController.js";
import { sendEmail } from "../services/emailservice.js";
import { Student } from "../models/studentSchema.js";
import { studentSignIn } from "../controllers/usersController.js";

const router = express.Router();

// Multer Configuration (Only Accept CSV)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
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

// 🚀 Upload CSV & Add Students to DB
router.post("/upload", upload.single("file"), async (req, res) => {
    console.log("Received file:", req.file); // Debugging
    
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    //res.status(200).json({ message: "File received successfully" });

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

                const studentsToInsert = [];
                const errors = [];

                for (const row of results.data) {
                    const { name, rollNo, cardID, email, branch, phoneNumber, password } = row;

                    // Validate required fields
                    if (!name || !rollNo || !cardID || !email || !branch || !phoneNumber || !password) {
                        errors.push(`Missing data for rollNo: ${rollNo}`);
                        continue;
                    }

                    // Check if student already exists
                    const existingStudent = await Student.findOne({
                        $or: [{ rollNo }, { email }, { cardID }, { phoneNumber }]
                    });

                    if (existingStudent) {
                        errors.push(`Duplicate: ${rollNo} / ${email} / ${cardID}`);
                        continue;
                    }

                    // Prepare student data
                    studentsToInsert.push({ name, rollNo, cardID, email, branch, phoneNumber, password });
                }

                if (studentsToInsert.length > 0) {
                    await Student.insertMany(studentsToInsert);
                }

                const students = results.data.map(student => ({
                    name: student.name,
                    rollNo: Number(student.rollNo), // Ensure it's a number
                    cardID: student.cardID,
                    email: student.email,
                    branch: student.branch,
                    phoneNumber: Number(student.phoneNumber), // Ensure it's a number
                    password: student.password
                }));

                console.log("Saving students:", students);

                //await Student.insertMany(results.data);
                //fs.unlinkSync(filePath); // Remove file after processing
                res.status(200).json({ message: "Students uploaded successfully" });
            } catch (error) {
                res.status(500).json({ message: "Error saving students", error });
            }
        }
    });
});

// 🏫 Fetch All Students
router.get('/getall', getAllStudents);

router.post("/student-login", studentSignIn);
router.get('/count', getStudentCount);

export default router;
