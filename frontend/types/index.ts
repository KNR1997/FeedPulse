export enum FeedbackCategoryType {
  BUG = "Bug",
  FEATURE_REQUEST = "Feature Request",
  IMPROVEMENT = "Improvement",
  OTHER = "Other",
}

export enum FeedbackStatusType {
  NEW = "New",
  IN_REVIEW = "In Review",
  RESOLVED = "Resolved",
}

export enum FeedbackSentimentType {
  NEGATIVE = "Negative",
  POSITIVE = "Positvie",
  NEUTRAL = "Neutral",
}

export interface Feedback {
  id: string;
  title: string;
  category: FeedbackCategoryType;
  status: FeedbackStatusType;
  description: string;
  createdAt: string;
  // ai fields
  ai_processed: string;
  ai_category: string;
  ai_sentiment: FeedbackSentimentType;
  ai_priority: string;
  ai_summary: string;
}

export interface CreateFeedbackInput {
  title: string;
  description: string;
  category: FeedbackCategoryType;
}

export interface UpdateFeedbackData {
  status: FeedbackStatusType;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginReponse {
  _id: string;
  name: string;
  email: string;
  token: string;  
}
