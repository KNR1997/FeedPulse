"use client";

import { useAtom, useAtomValue } from "jotai";
// store
import {
  feedbackCategoryAtom,
  feedbackPageAtom,
  feedbackStatusAtom,
} from "@/store/feedback-filters";
// hooks
import { useFeedbacksQuery } from "@/data/feedback";
// components
import { FeedbackList } from "@/components/feedbacks/feedback-list";
import FeedbackFilters from "@/components/feedbacks/feedback-filters";

export default function Feedbacks() {
  // store states
  const category = useAtomValue(feedbackCategoryAtom);
  const status = useAtomValue(feedbackStatusAtom);
  const [page, setPage] = useAtom(feedbackPageAtom);
  // query
  const { feedbacks, paginationrInfo, loading, error } = useFeedbacksQuery({
    category,
    status,
    page,
  });

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>Failed to load feedbacks</p>;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Feedbacks</h3>

      <FeedbackFilters />

      <FeedbackList
        feedbacks={feedbacks}
        pagination={paginationrInfo}
        onPageChange={setPage}
      />
    </div>
  );
}
