"use client";

import { Formik } from "formik";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Card,
  CardBody,
  Chip,
  Divider,
} from "@nextui-org/react";
// types
import { Feedback, FeedbackSentimentType, FeedbackStatusType } from "@/types";
// hooks
import {
  useAnalyzeFeedbackMutation,
  useUpdateFeedbackMutation,
} from "@/data/feedback";

type Props = {
  initialValues: Feedback;
};

export const FeedbackAdminForm = ({ initialValues }: Props) => {
  // mutations
  const { mutate: updateFeedback, isPending: isUpdating } =
    useUpdateFeedbackMutation();
  const { mutate: analyzeFeedback, isPending: isAnalyzing } =
    useAnalyzeFeedbackMutation();

  const handleFeedbackSubmit = (values: Feedback) => {
    updateFeedback({
      id: initialValues.id,
      status: values.status,
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFeedbackSubmit}>
      {({ values, handleSubmit, setFieldValue }) => (
        <div className="flex flex-col gap-6 w-1/2">
          {/* Feedback Info */}
          <Card>
            <CardBody className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Feedback Details</div>

              <Input
                variant="bordered"
                label="Title"
                value={values.title}
                disabled
              />

              <Textarea
                variant="bordered"
                label="Description"
                value={values.description}
                disabled
              />

              <Input
                variant="bordered"
                label="Category"
                value={values.category}
                disabled
              />
            </CardBody>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardBody className="flex flex-col gap-4">
              <div className="text-lg font-semibold">🤖 AI Analysis Result</div>

              <Divider />

              <div className="flex gap-3 flex-wrap">
                <Chip color="primary" variant="flat">
                  Category: {values.ai_category}
                </Chip>

                <Chip
                  color={
                    values.ai_sentiment === FeedbackSentimentType.POSITIVE
                      ? "success"
                      : values.ai_sentiment === FeedbackSentimentType.NEGATIVE
                        ? "danger"
                        : "warning"
                  }
                  variant="flat"
                >
                  Sentiment: {values.ai_sentiment}
                </Chip>

                <Chip color="secondary" variant="flat">
                  Priority: {values.ai_priority}
                </Chip>

                <Chip color="default" variant="flat">
                  Processed: {values.ai_processed ? "Yes" : "No"}
                </Chip>
              </div>

              <Textarea
                variant="bordered"
                label="AI Summary"
                value={values.ai_summary}
                disabled
              />
              <Button
                color="secondary"
                onPress={() => analyzeFeedback(values.id)}
                isLoading={isAnalyzing}
              >
                Analyze Feedback
              </Button>
            </CardBody>
          </Card>

          {/* Status Update */}
          <Card>
            <CardBody className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Update Status</div>

              <Select
                label="Status"
                variant="bordered"
                selectedKeys={values.status ? [values.status] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setFieldValue("status", selected);
                }}
              >
                {Object.values(FeedbackStatusType).map((status) => (
                  <SelectItem key={status}>{status}</SelectItem>
                ))}
              </Select>

              <Button
                onPress={() => handleSubmit()}
                color="primary"
                isLoading={isUpdating}
              >
                Update Status
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </Formik>
  );
};
