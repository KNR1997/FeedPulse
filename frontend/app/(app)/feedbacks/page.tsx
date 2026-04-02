"use client";

import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
// lib
import { getFeedbacks } from "@/lib/api";
// components
import { FeedbackList } from "@/components/feedbacks/feedback-list";
import FeedbackFilters from "@/components/feedbacks/feedback-filters";
import { feedbackCategoryAtom, feedbackPageAtom, feedbackStatusAtom } from "@/store/feedback-filters";

export default function Feedbacks() {
  const [category, setCategory] = useAtom(feedbackCategoryAtom);
  const [status, setStatus] = useAtom(feedbackStatusAtom);
  const [page, setPage] = useAtom(feedbackPageAtom);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedbacks", { category, status, page }],
    queryFn: () => getFeedbacks({ category, status, page, limit: 10 }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p>Loading feedbacks...</p>;
  if (isError) return <p>Failed to load feedbacks</p>;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Feedbacks</h3>

      <FeedbackFilters />

      <FeedbackList
        feedbacks={data.data}
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
