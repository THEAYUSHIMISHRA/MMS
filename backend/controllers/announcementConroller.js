import { Announcement } from "../models/announcementSchema.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createAnnouncement = async (req, res, next) => {
  try {
    const { announcement } = req.body;
    const uploadedFiles = req.files;

    // Validate either announcement or files must exist
    if (!announcement && (!uploadedFiles || uploadedFiles.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Either announcement text or at least one file is required"
      });
    }

    // Process files
    const files = uploadedFiles?.map(file => ({
      data: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`, // Convert buffer to Base64
      contentType: file.mimetype,
      filename: file.originalname
    })) || [];

    // Create announcement
    const newAnnouncement = await Announcement.create({ 
      announcement: announcement || "", 
      files
    });

    res.status(200).json({
      success: true,
      message: "Announcement Created!",
      announcement: newAnnouncement
    });

  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({
    success: true,
    announcements,
  }); 
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAnnouncementCount = async (req, res, next) => {
  try {
    const count = await Announcement.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    next(err);
  }
};
