"use client";

import React from "react";
// types
import { Feedback } from "@/types";
// utils
import { formatISODate } from "@/utils/format-date";
import { feedbackStatusColor } from "@/utils/feedback-status-color";
import {
  feedbackCategoryColor,
  feedbackCategoryName,
} from "@/utils/feedback-category-color";
// ui
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

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

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "CATEGORY", uid: "category" },
    { name: "STATUS", uid: "status" },
    { name: "DATE", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleViewFeedback = (feedbackId: string) => {
    router.push(`/feedbacks/${feedbackId}`);
  };

  const handleFeedbackDelete = (feedbackId: string) => {
    console.log("delete feedback---------: ", feedbackId);
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
            <TableRow key={feedback._id}>
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
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => handleViewFeedback(feedback._id)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() => handleFeedbackDelete(feedback._id)}
                      >
                        Delete
                      </Button>
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
        ></Pagination>
      </div>
    </div>
  );
};
