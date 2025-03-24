import { handleValidationError } from "../middlewares/errorHandler.js";
import { Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/usersSchema.js";
import { Teacher } from "../models/usersSchema.js";

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
    // Your sign-in logic for student goes here
    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
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
    // Your sign-in logic for teacher goes here
    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};
