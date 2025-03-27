import express from "express";
import { getAllEvents, createEvents, deleteEvent, getEventsCount } from "../controllers/eventsController.js";

const router = express.Router();

router.get('/getall', getAllEvents);
router.post('/', createEvents);
router.delete('/:id', deleteEvent);
router.get('/count', getEventsCount);

export default router;
