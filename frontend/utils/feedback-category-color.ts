import { FeedbackCategoryType, FeedbackSentimentType } from "@/types";

export const feedbackCategoryColor = (
  feedbackCategory: FeedbackCategoryType,
) => {
  if (feedbackCategory == FeedbackCategoryType.BUG) {
    return "danger";
  } else if (feedbackCategory == FeedbackCategoryType.FEATURE_REQUEST) {
    return "success";
  } else if (feedbackCategory == FeedbackCategoryType.IMPROVEMENT) {
    return "primary";
  } else if (feedbackCategory == FeedbackCategoryType.OTHER) {
    return "default";
  }
};

export const feedbackCategoryName = (
  feedbackCategory: FeedbackCategoryType,
) => {
  if (feedbackCategory == FeedbackCategoryType.BUG) {
    return "Bug";
  } else if (feedbackCategory == FeedbackCategoryType.FEATURE_REQUEST) {
    return "Feature";
  } else if (feedbackCategory == FeedbackCategoryType.IMPROVEMENT) {
    return "Improvement";
  } else if (feedbackCategory == FeedbackCategoryType.OTHER) {
    return "Other";
  }
};

export const feedbackSentimentColor = (
  feedbackSentimentType: FeedbackSentimentType,
) => {
  if (feedbackSentimentType == FeedbackSentimentType.NEGATIVE) {
    return "danger";
  } else if (feedbackSentimentType == FeedbackSentimentType.POSITIVE) {
    return "success";
  } else if (feedbackSentimentType == FeedbackSentimentType.NEUTRAL) {
    return "primary";
  }
};