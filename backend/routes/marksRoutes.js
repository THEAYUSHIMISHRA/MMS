import express from "express";
import {
  submitMarks,
  getAllMarks,
  adminSubmitMarks, // ✅ Importing new admin controller
} from "../controllers/marksController.js";

const router = express.Router();

// Teacher/General Marks
router.post('/', submitMarks);

// Admin Marks Route ✅ NEW
router.post('/admin', adminSubmitMarks);

// Get all marks
router.get('/getall', getAllMarks);

export default router;
