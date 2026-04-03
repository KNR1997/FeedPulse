import { createFeedbackDto, feedbackListDto, feedbackResponseDto } from "../dtos/feedback.dto.js";
import {
  createFeedbackService,
  deleteFeedbackService,
  getFeedbackService,
  getFeedbacksService,
  retriggerFeedbackAnalysisService,
  updateFeedbackService,
} from "../services/feedback.serivce.js";

// @desc    Create Feedback
// @route   POST /api/Feedbacks
export const createFeedback = async (req, res, next) => {
  try {
    const dto = createFeedbackDto(req.body);
    const feedback = await createFeedbackService(dto);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Re-trigger Feedback analysis
// @route   POST /api/Feedbacks/:id/analyze
export const retriggerFeedbackAnalysis = async (req, res, next) => {
  try {
    const feedbackId  = req.params.id
    const feedback = await retriggerFeedbackAnalysisService(feedbackId );
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all Feedbacks
// @route   GET /api/Feedbacks
export const getFeedbacks = async (req, res, next) => {
  try {
    const result = await getFeedbacksService(req.query);

    res.status(200).json({
      data: feedbackListDto(result.data),
      pagination: result.pagination,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single Feedback
// @route   GET /api/Feedbacks/:id
export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await getFeedbackService(req.params.id);

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json(feedbackResponseDto(feedback));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update Feedback
// @route   UPDATE /api/Feedbacks/:id
export const updateFeedback = async (req, res, next) => {
  try {
    const feedback = await updateFeedbackService(req.params.id, req.body);

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete Feedback
// @route   DELETE /api/Feedbacks/:id
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await deleteFeedbackService(req.params.id);

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
