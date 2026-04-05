export const feedbackResponseDto = (feedback) => ({
  id: feedback._id,
  title: feedback.title,
  description: feedback.description,
  category: feedback.category,
  status: feedback.status,
  createdAt: feedback.createdAt,
  // ai fields
  ai_processed: feedback.ai_processed,
  ai_category: feedback.ai_category,
  ai_sentiment: feedback.ai_sentiment,
  ai_priority: feedback.ai_priority,
  ai_summary: feedback.ai_summary,
  ai_processed: feedback.ai_processed,
});

export const feedbackListDto = (feedbacks) =>
  feedbacks.map(feedbackResponseDto);

export const createFeedbackDto = (body) => {
  return {
    title: body.title,
    description: body.description,
    category: body.category,
    submitterName: body.submitterName,
    submitterEmail: body.submitterEmail,
  };
};

export const updateFeedbackDto = (body) => {
  return {
    status: body.status,
  };
};

export const updateFeedbackResponseDto = (feedback) => ({
  id: feedback._id,
  status: feedback.status,
});
