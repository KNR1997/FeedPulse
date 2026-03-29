import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  updateFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// Create new Feedback
router.post("/", createFeedback);

// Get all Feedbacks
router.get("/", getFeedbacks);

// Get single Feedback
router.get("/:id", getFeedback);

// Update single Feedback
router.put("/:id", updateFeedback);

// Delete Feedback
router.delete("/:id", deleteFeedback);

export default router;
