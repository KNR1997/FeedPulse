"use client";

import { useParams } from "next/navigation";
// hooks
import { useFeedbackQuery } from "@/data/feedback";
// components
import { FeedbackAdminForm } from "@/components/feedbacks/feedback-form";

export default function FeedbackPage() {
  const params = useParams();
  const feedbackId = params.id;
  // query
  const { feedback, loading, error } = useFeedbackQuery(feedbackId as string);

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>Failed to load feedbacks</p>;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">View Feedback</h3>

      <FeedbackAdminForm initialValues={feedback} />
    </div>
  );
}
