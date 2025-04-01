import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    announcement: {
    type: String,
    required: function() { return this.files.length === 0; }
  },
  files: [{
    data: String,
    contentType: String,
    filename: String
  }]
});

export const Announcement = mongoose.model('Announcement', announcementSchema);
