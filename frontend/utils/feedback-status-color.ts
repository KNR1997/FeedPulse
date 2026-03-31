import { FeedbackStatusType } from "@/types";

export const feedbackStatusColor = (feedbackStatus: FeedbackStatusType) => {
  if (feedbackStatus == FeedbackStatusType.NEW) {
    return "success";
  } else if (feedbackStatus == FeedbackStatusType.IN_REVIEW) {
    return "warning";
  } else if (feedbackStatus == FeedbackStatusType.RESOLVED) {
    return "default";
  }
};
