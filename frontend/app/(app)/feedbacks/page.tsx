"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// lib
import { getFeedbacks } from "@/lib/api";
// components
import { FeedbackList } from "@/components/feedbacks/feedback-list";
import FeedbackFilters from "@/components/feedbacks/feedback-filters";

export default function Feedbacks() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedbacks", { category, status, page }],
    queryFn: () => getFeedbacks({ category, status, page, limit: 5 }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p>Loading feedbacks...</p>;
  if (isError) return <p>Failed to load feedbacks</p>;

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Feedbacks</h3>

      <FeedbackFilters
        onCategoryFilter={(value: any) => {
          setCategory(value);
        }}
        onStatusFilter={(value: any) => {
          setStatus(value);
        }}
      />

      <FeedbackList
        feedbacks={data.data}
        pagination={data.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
