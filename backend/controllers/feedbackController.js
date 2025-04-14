import { Feedback } from "../models/feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { feedbackText, rating, email, teamId } = req.body;

    const feedback = new Feedback({ feedbackText, rating, email, teamId });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit feedback." });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("email", "name")
      .populate("teamId", "name");

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
};
