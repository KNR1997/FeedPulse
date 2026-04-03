import Feedback from "../models/Feedback.js";
import { analyzeFeedbackWithGemini } from "./gemini.service.js";

// Create Feedback
export const createFeedbackService = async (createDto) => {
  const newFeedback = new Feedback(createDto);

  const savedFeedback = await newFeedback.save();

  // async Gemini call
  analyzeFeedbackWithGemini(
    savedFeedback._id,
    savedFeedback.title,
    savedFeedback.description,
  ).catch((err) => console.error("Gemini analysis error:", err.message));

  return savedFeedback;
};

// Re-Trigger Feedback ai anaylysis
export const retriggerFeedbackAnalysisService = async (feedbackId) => {
  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) throw new Error("Feedback not found");
  
  // async Gemini call
  analyzeFeedbackWithGemini(
    feedback._id,
    feedback.title,
    feedback.description,
  ).catch((err) => console.error("Gemini analysis error:", err.message));

  return feedback;
};

// Get Feedbacks
export const getFeedbacksService = async (query) => {
  const { category, status, page = 1, limit = 5 } = query;

  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);

  const total = await Feedback.countDocuments(filter);

  const feedbacks = await Feedback.find(filter)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  return {
    data: feedbacks,
    pagination: {
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

// Get single feedback
export const getFeedbackService = async (id) => {
  return await Feedback.findById(id);
};

// Update
export const updateFeedbackService = async (id, data) => {
  return await Feedback.findByIdAndUpdate(id, data, { new: true });
};

// Delete
export const deleteFeedbackService = async (id) => {
  return await Feedback.findByIdAndDelete(id);
};
