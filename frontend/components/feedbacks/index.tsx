"use client";
import React from "react";
import { FeedbackList } from "./feedback-list";

export const Feedbacks = () => {
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Feedbacks</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center"></div>
      <div className="max-w-[95rem] mx-auto w-full">
        <FeedbackList />
      </div>
    </div>
  );
};
