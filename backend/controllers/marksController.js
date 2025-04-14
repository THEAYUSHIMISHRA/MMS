import Marks from "../models/marksSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// 👩‍🏫 Teacher/General Marks Submission
export const submitMarks = async (req, res, next) => {
  const { marksData } = req.body;

  try {
    if (!marksData || !Array.isArray(marksData) || marksData.length === 0) {
      return handleValidationError("Marks data is missing or invalid!", 400);
    }

    const records = await Promise.all(
      marksData.map(async (record) => {
        const { student, srsSds, presentation, internal1, internal2, finalInternal } = record;

        const updated = await Marks.findOneAndUpdate(
          { student },
          { srsSds, presentation, internal1, internal2, finalInternal },
          { new: true, upsert: true }
        );

        return updated;
      })
    );

    res.status(200).json({
      success: true,
      message: "Marks submitted successfully!",
      records,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ New: Admin-Only Marks Submission
export const adminSubmitMarks = async (req, res, next) => {
  const { marksData } = req.body;

  try {
    if (!marksData || !Array.isArray(marksData) || marksData.length === 0) {
      return handleValidationError("Admin marks data is missing or invalid!", 400);
    }

    const records = await Promise.all(
      marksData.map(async (record) => {
        const { student, presentation, report, finalMarks } = record;

        const updated = await Marks.findOneAndUpdate(
          { student },
          { presentation, report, finalMarks },
          { new: true, upsert: true }
        );

        return updated;
      })
    );

    res.status(200).json({
      success: true,
      message: "Admin marks submitted successfully!",
      records,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllMarks = async (req, res, next) => {
  try {
    const marks = await Marks.find().populate("student", "name rollNo cardID");
    res.status(200).json({
      success: true,
      marks,
    });
  } catch (err) {
    next(err);
  }
};
