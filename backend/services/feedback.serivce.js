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
export const updateFeedbackService = async (id, updateDto) => {
  return await Feedback.findByIdAndUpdate(id, updateDto, { new: true });
};

// Delete
export const deleteFeedbackService = async (id) => {
  return await Feedback.findByIdAndDelete(id);
};

// Re-Trigger Feedback ai anaylysis
export const retriggerFeedbackAnalysisService = async (feedbackId) => {
  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    throw new Error("Feedback not found");
  }

  await analyzeFeedbackWithGemini(
    feedback._id,
    feedback.title,
    feedback.description
  );

  return await Feedback.findById(feedbackId);
};

// Feedback Analytics
export const getFeedbackAnalyticsService = async () => {
  const analytics = await Feedback.aggregate([
    {
      $facet: {
        statusCounts: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],

        avgPriority: [
          {
            $group: {
              _id: null,
              averagePriority: { $avg: "$ai_priority" },
            },
          },
        ],

        tags: [
          { $unwind: "$ai_tags" },
          {
            $group: {
              _id: "$ai_tags",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 1 },
        ],

        total: [
          {
            $count: "totalFeedbacks",
          },
        ],
      },
    },
  ]);

  const result = analytics[0];

  const statusMap = {
    New: 0,
    "In Review": 0,
    Resolved: 0,
  };

  result.statusCounts.forEach((s) => {
    statusMap[s._id] = s.count;
  });

  return {
    totalFeedbacks: result.total[0]?.totalFeedbacks || 0,
    statusCounts: statusMap,
    averagePriority: result.avgPriority[0]?.averagePriority || 0,
    mostCommonTag: result.tags[0]?._id || null,
    mostCommonTagCount: result.tags[0]?.count || 0,
  };
};
