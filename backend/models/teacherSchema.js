import mongoose from "mongoose";
import validator from "validator";

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  phno: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v), // Ensure exactly 10 digits
      message: "Phone number must be 10 digits",
    },
  },
  subject: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


export const Teacher = mongoose.model('Teacher', teacherSchema);

