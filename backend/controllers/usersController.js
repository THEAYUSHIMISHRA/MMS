import { handleValidationError } from "../middlewares/errorHandler.js";
import { Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";

export const adminSignIn = async (req, res, next) => {

  console.log("Received Request Body:", req.body);

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("Missing fields:", { email, password });

      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    const existingAdmin = await Admin.findOne({ email });
    const isPasswordValid = existingAdmin.password === password;

    //console.log("Admin Found:", existingAdmin);

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    return res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      admin: {
        email: existingAdmin.email,
        name: existingAdmin.name,
        phno: existingAdmin.phno,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {

    //console.log("Request Body:", req.body); // Debugging
    console.log("Request Query:", req.query); // Debugging

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const admin = await Admin.findOne({ email }).select("-password");
    
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    return res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};


export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Check if student exists in the database
    const existingStudent = await Student.findOne({ email });

    if (!existingStudent) {
      return res.status(401).json({ success: false, message: "Student not found. Please check your email." });
    }

    // Check if password matches
    if (existingStudent.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    // Your sign-in logic for student goes here
    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
      student: {
        id: existingStudent._id,
        name: existingStudent.name,
        rollNo: existingStudent.rollNo,
        branch: existingStudent.branch,
        email: existingStudent.email,
        phoneNumber: existingStudent.phoneNumber,
        cardID: existingStudent.cardID,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingTeacher = await Teacher.findOne({ email });

    if (!existingTeacher) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    if (existingTeacher.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Your sign-in logic for teacher goes here
    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
      teacher: {
        id: existingTeacher._id,
        name: existingTeacher.name,
        email: existingTeacher.email,
        phno: existingTeacher.phno,
        subject: existingTeacher.subject,
      },
    });
  } catch (err) {
    next(err);
  }
};
