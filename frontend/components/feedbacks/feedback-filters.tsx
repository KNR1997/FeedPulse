"use client";

import { useState } from "react";
// types
import { FeedbackCategoryType, FeedbackStatusType } from "@/types";
// ui
import { Button, Select, SelectItem } from "@nextui-org/react";

type Props = {
  onCategoryFilter: (newValue: string) => void;
  onStatusFilter: (newValue: string) => void;
  className?: string;
};

export default function FeedbackFilters({
  onCategoryFilter,
  onStatusFilter,
}: Props) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleCategoryChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    setCategory(selected || "");
    onCategoryFilter(selected || "");
  };

  const handleStatusChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    setStatus(selected || "");
    onStatusFilter(selected || "");
  };

  const handleReset = () => {
    setCategory("");
    setStatus("");
    onCategoryFilter("");
    onStatusFilter("");
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
