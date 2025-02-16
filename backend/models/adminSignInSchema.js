import mongoose from "mongoose";
import validator from "validator";

const adminSignInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,  // regex for valid email format
        validate: [validator.isEmail, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});

export const AdminSignIn = mongoose.model('Admin SignIn', adminSignInSchema);