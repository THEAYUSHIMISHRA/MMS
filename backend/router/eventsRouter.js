import express from "express";
import { getAllEvents, createEvents, deleteEvent } from "../controllers/eventsController.js";

const router = express.Router();

router.get('/getall', getAllEvents);
router.post('/', createEvents);
router.delete('/:id', deleteEvent);

export default router;
