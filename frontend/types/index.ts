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

export interface Feedback {
  _id: string;
  title: string;
  category: FeedbackCategoryType;
  status: FeedbackStatusType;
  description: string;
  
  createdAt: string;
}

export interface UpdateFeedbackData {
  status: FeedbackStatusType;
}
