import {
  createFeedbackDto,
  feedbackListDto,
  feedbackResponseDto,
  updateFeedbackDto,
  updateFeedbackResponseDto,
} from "../dtos/feedback.dto.js";
import {
  createFeedbackService,
  deleteFeedbackService,
  getFeedbackAnalyticsService,
  getFeedbackService,
  getFeedbacksService,
  retriggerFeedbackAnalysisService,
  updateFeedbackService,
} from "../services/feedback.serivce.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

// @desc    Create Feedback
// @route   POST /api/Feedbacks
export const createFeedback = async (req, res, next) => {
  try {
    const dto = createFeedbackDto(req.body);
    const feedback = await createFeedbackService(dto);

    return successResponse(
      res,
      feedbackResponseDto(feedback),
      "Feedback created successfully",
      201,
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// @desc    Get all Feedbacks
// @route   GET /api/Feedbacks
export const getFeedbacks = async (req, res, next) => {
  try {
    const result = await getFeedbacksService(req.query);

    return successResponse(res, {
      feedbacks: feedbackListDto(result.data),
      pagination: result.pagination,
    });
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// @desc    Get single Feedback
// @route   GET /api/Feedbacks/:id
export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await getFeedbackService(req.params.id);

    if (!feedback) return errorResponse(res, "Feedback not found", 404);

    return successResponse(
      res,
      feedbackResponseDto(feedback),
      "Feedback retrieved",
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// @desc    Update Feedback
// @route   UPDATE /api/Feedbacks/:id
export const updateFeedback = async (req, res, next) => {
  try {
    const dto = updateFeedbackDto(req.body);
    const feedback = await updateFeedbackService(req.params.id, dto);

    if (!feedback) return errorResponse(res, "Feedback not found", 404);

    return successResponse(
      res,
      updateFeedbackResponseDto(feedback),
      "Feedback updated",
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// @desc    Delete Feedback
// @route   DELETE /api/Feedbacks/:id
export const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await deleteFeedbackService(req.params.id);

    if (!feedback) return errorResponse(res, "Feedback not found", 404);

    return successResponse(res, null, "Feedback deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// @desc    Re-trigger Feedback analysis
// @route   POST /api/Feedbacks/:id/analyze
export const retriggerFeedbackAnalysis = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await retriggerFeedbackAnalysisService(feedbackId);

    return successResponse(
      res,
      feedbackResponseDto(feedback),
      "Feedback analysis triggered",
      200,
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// @desc    Get Feedback Analytics
// @route   GET /api/Feedbacks/analytics
export const getFeedbackAnalytics = async (req, res) => {
  try {
    const analytics = await getFeedbackAnalyticsService();

    return successResponse(
      res,
      analytics,
      "Feedback analytics retrieved successfully",
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
