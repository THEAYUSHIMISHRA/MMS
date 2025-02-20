import express from "express";
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement } from "../controllers/announcementConroller.js";

const router = express.Router();

router.get('/getall', getAllAnnouncements);
router.post('/', createAnnouncement);
router.delete('/:id', deleteAnnouncement); 


export default router; 


