import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance1 = ({
  totalFeedbacks,
  statusCounts,
}: {
  totalFeedbacks: number;
  statusCounts: { NEW: number; IN_REVIEW: number; RESOLVED: number };
}) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Total Feedbacks</span>
            <span className="text-white text-xs">{totalFeedbacks}</span>
          </div>
        </div>
        {/* <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">New</span>
          <span className="text-success text-xs">10</span>
        </div> */}
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↓"}</span>
              <span className="text-xs text-white">{statusCounts?.NEW}</span>
            </div>
            <span className="text-white text-xs">New</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs text-white">
                {statusCounts?.IN_REVIEW}
              </span>
            </div>
            <span className="text-white text-xs">In-Review</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs text-white">
                {statusCounts?.RESOLVED}
              </span>
            </div>
            <span className="text-white text-xs">Resolved</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
