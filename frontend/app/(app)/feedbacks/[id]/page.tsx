"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// lib
import { getFeedback } from "@/lib/api";
// components
import { FeedbackAdminForm } from "@/components/feedbacks/feedback-form";

export default function FeedbackPage() {
  const params = useParams(); // get route params
  const feedbackId = params.id; // dynamic [id] from route

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedback", feedbackId],
    queryFn: () => getFeedback(feedbackId as string),
    enabled: !!feedbackId,
  });

  if (isLoading) return <p>Loading feedbacks...</p>;
  if (isError) return <p>Failed to load feedbacks</p>;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">View Feedback</h3>

      <FeedbackAdminForm initialValues={data} />
    </div>
  );
}
