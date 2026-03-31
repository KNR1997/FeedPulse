import { FeedbackCategoryType, FeedbackStatusType } from "@/types";
import { Button } from "@nextui-org/react";

type Props = {
  onCategoryFilter: (newValue: string) => void;
  onStatusFilter: (newValue: string) => void;
  className?: string;
};

export default function FeedbackFilters({
  onCategoryFilter,
  onStatusFilter,
}: Props) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border rounded p-2"
        onChange={(e) => onCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value={FeedbackCategoryType.BUG}>Bug</option>
        <option value={FeedbackCategoryType.FEATURE_REQUEST}>Feature</option>
        <option value={FeedbackCategoryType.IMPROVEMENT}>Improvement</option>
        <option value={FeedbackCategoryType.OTHER}>Other</option>
      </select>

      <select
        className="border rounded p-2"
        onChange={(e) => onStatusFilter(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value={FeedbackStatusType.NEW}>New</option>
        <option value={FeedbackStatusType.IN_REVIEW}>In Review</option>
        <option value={FeedbackStatusType.RESOLVED}>Resolved</option>
      </select>

      <Button
        size="sm"
        color="primary"
        onPress={() => {
          onCategoryFilter("");
          onStatusFilter("");
        }}
      >
        Reset
      </Button>
    </div>
  );
}
