import React from "react";
import { useRouter } from "next/navigation";
// utils
import {
  feedbackCategoryColor,
  feedbackCategoryName,
} from "@/utils/feedback-category-color";
// ui
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  Chip,
  TableHeader,
  TableRow,
  Card,
  CardBody,
} from "@nextui-org/react";
// types
import { Feedback } from "@/types";
// hooks
import { useFeedbacksQuery } from "@/data/feedback";
// components
import { EyeIcon } from "@/components/icons/eyes-icon";

export const CardTransactions = () => {
  const router = useRouter();

  // query
  const { feedbacks, paginationrInfo, loading, error } = useFeedbacksQuery({
    limit: 5,
  });

  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "CATEGORY", uid: "category" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleViewFeedback = (feedbackId: string) => {
    router.push(`/feedbacks/${feedbackId}`);
  };

  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Latest Feedbacks
            </span>
          </div>
        </div>

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
              {(feedback: Feedback) => (
                <TableRow key={feedback.id}>
                  {(columnKey) => (
                    <TableCell>
                      {/* Inline cell rendering logic */}
                      {columnKey === "title" && <span>{feedback.title}</span>}
                      {columnKey === "category" && (
                        <span>
                          <Chip
                            color={feedbackCategoryColor(feedback.category)}
                          >
                            {feedbackCategoryName(feedback.category)}
                          </Chip>
                        </span>
                      )}
                      {columnKey === "actions" && (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewFeedback(feedback.id)}
                          >
                            <EyeIcon height={16} />
                          </button>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
