import mongoose from "mongoose";
import validator from "validator";

const eventsSchema = new mongoose.Schema({
  events: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
});


export const Events = mongoose.model('Events', eventsSchema);



