import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // ✅ must match model name for teachers
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team", // ✅ must match model name for teams
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//  "Feedback" becomes "feedbacks" collection in MongoDB
export const Feedback = mongoose.model("Feedback", feedbackSchema);
