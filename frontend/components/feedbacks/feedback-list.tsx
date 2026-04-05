"use client";

// types
import { Feedback } from "@/types";
// utils
import { formatISODate } from "@/utils/format-date";
import { feedbackStatusColor } from "@/utils/feedback-status-color";
import {
  feedbackCategoryColor,
  feedbackCategoryName,
  feedbackSentimentColor,
} from "@/utils/feedback-category-color";
// ui
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Pagination,
} from "@nextui-org/react";
// config
import { Routes } from "@/config/routes";
// hooks
import { useRouter } from "next/navigation";
import { useModalAction } from "@/components/ui/modal/modal-context";
// components
import { EditIcon } from "@/components/icons/edit";
import { TrashIcon } from "@/components/icons/trash";

type Props = {
  feedbacks: Feedback[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
};

export const FeedbackList = ({
  feedbacks,
  pagination,
  onPageChange,
}: Props) => {
  const router = useRouter();
  const { openModal } = useModalAction();

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "CATEGORY", uid: "category" },
    { name: "SENTIMENT", uid: "ai_sentiment" },
    { name: "PRIORITY_SCORE", uid: "ai_priority" },
    { name: "STATUS", uid: "status" },
    { name: "DATE", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleViewFeedback = (feedbackId: string) => {
    router.push(`${Routes.feedbacks}/${feedbackId}`);
  };

  const handleFeedbackDelete = (feedbackId: string) => {
    openModal("DELETE_FEEDBACK", feedbackId);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Feedback table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={feedbacks}>
          {(feedback) => (
            <TableRow key={feedback.id}>
              {(columnKey) => (
                <TableCell>
                  {/* Inline cell rendering logic */}
                  {columnKey === "title" && <span>{feedback.title}</span>}
                  {columnKey === "category" && (
                    <span>
                      <Chip color={feedbackCategoryColor(feedback.category)}>
                        {feedbackCategoryName(feedback.category)}
                      </Chip>
                    </span>
                  )}
                  {columnKey === "ai_sentiment" && (
                    <span>
                      <Chip
                        color={feedbackSentimentColor(feedback.ai_sentiment)}
                      >
                        {feedback?.ai_sentiment}
                      </Chip>
                    </span>
                  )}
                  {columnKey === "ai_priority" && (
                    <span>
                      {feedback?.ai_priority ? feedback.ai_priority : "_"}
                    </span>
                  )}
                  {columnKey === "status" && (
                    <span>
                      <Chip color={feedbackStatusColor(feedback.status)}>
                        {feedback.status}
                      </Chip>
                    </span>
                  )}
                  {columnKey === "createdAt" && (
                    <span>{formatISODate(feedback.createdAt)}</span>
                  )}

                  {columnKey === "actions" && (
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => handleViewFeedback(feedback.id)}>
                        <EditIcon height={16} />
                      </button>
                      <button onClick={() => handleFeedbackDelete(feedback.id)}>
                        <TrashIcon
                          className="text-red-500 ml-2 transition duration-200 hover:text-red-600 focus:outline-none"
                          width={14}
                        />
                      </button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Pagination
          page={pagination.page}
          total={pagination.totalPages}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};
