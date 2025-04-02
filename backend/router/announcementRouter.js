import express from "express";
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement, getAnnouncementCount, upload } from "../controllers/announcementConroller.js";

const router = express.Router();

router.get('/getall', getAllAnnouncements);
router.post('/', upload.array('files'), createAnnouncement);
router.delete('/:id', deleteAnnouncement); 
router.get('/count', getAnnouncementCount);

export default router; 
