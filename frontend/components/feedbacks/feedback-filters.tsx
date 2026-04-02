"use client";

import { useAtom } from "jotai";
// types
import { FeedbackCategoryType, FeedbackStatusType } from "@/types";
// ui
import { Button, Select, SelectItem } from "@nextui-org/react";
import {
  feedbackCategoryAtom,
  feedbackPageAtom,
  feedbackStatusAtom,
} from "@/store/feedback-filters";

export default function FeedbackFilters() {
  const [category, setCategory] = useAtom(feedbackCategoryAtom);
  const [status, setStatus] = useAtom(feedbackStatusAtom);
  const [, setPage] = useAtom(feedbackPageAtom);

  const handleCategoryChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    setCategory(selected || "");
    setPage(1);
  };

  const handleStatusChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    setStatus(selected || "");
    setPage(1);
  };

  const handleReset = () => {
    setCategory("");
    setStatus("");
    setPage(1);
  };

  return (
    <div className="flex gap-4 mb-4 items-end">
      {/* Category Select */}
      <Select
        label="Category"
        placeholder="All Categories"
        variant="bordered"
        className="max-w-xs"
        selectedKeys={category ? [category] : []}
        onSelectionChange={handleCategoryChange}
      >
        <SelectItem key={FeedbackCategoryType.BUG}>Bug</SelectItem>

        <SelectItem key={FeedbackCategoryType.FEATURE_REQUEST}>
          Feature
        </SelectItem>

        <SelectItem key={FeedbackCategoryType.IMPROVEMENT}>
          Improvement
        </SelectItem>

        <SelectItem key={FeedbackCategoryType.OTHER}>Other</SelectItem>
      </Select>

      {/* Status Select */}
      <Select
        label="Status"
        placeholder="All Statuses"
        variant="bordered"
        className="max-w-xs"
        selectedKeys={status ? [status] : []}
        onSelectionChange={handleStatusChange}
      >
        <SelectItem key={FeedbackStatusType.NEW}>New</SelectItem>

        <SelectItem key={FeedbackStatusType.IN_REVIEW}>In Review</SelectItem>

        <SelectItem key={FeedbackStatusType.RESOLVED}>Resolved</SelectItem>
      </Select>

      {/* Reset Button */}
      <Button size="lg" color="primary" variant="flat" onPress={handleReset}>
        Reset
      </Button>
    </div>
  );
}
