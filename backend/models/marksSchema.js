import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  srsSds: { type: Number, default: 0 },
  presentation: { type: Number, default: 0 },
  internal1: { type: Number, default: 0 },
  internal2: { type: Number, default: 0 },
  finalInternal: { type: Number, default: 0 },
  
  // ✅ New fields for admin submission
  report: { type: Number, default: 0 },
  finalMarks: { type: Number, default: 0 },
});

export default mongoose.model("Marks", marksSchema);
