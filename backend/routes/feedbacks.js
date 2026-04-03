import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  updateFeedback,
  retriggerFeedbackAnalysis,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new Feedback
router.post("/", createFeedback);

// Get all Feedbacks
router.get("/", protect, getFeedbacks);

// Get single Feedback
router.get("/:id", protect, getFeedback);

// Update single Feedback
router.put("/:id", protect, updateFeedback);

// Delete Feedback
router.delete("/:id", protect, deleteFeedback);

// Re-trigger AI analysis
router.post("/:id/analyze", protect, retriggerFeedbackAnalysis);

export default router;
