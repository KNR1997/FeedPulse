"use client";

import { Feedback, FeedbackStatusType } from "@/types";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback } from "@/lib/api";

type Props = {
  initialValues: Feedback;
};

export const FeedbackAdminForm = ({ initialValues }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      updateFeedback(data.id, { status: data.status }),

    onSuccess: () => {
      toast.success("Status updated successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },

    onError: () => {
      toast.error("Failed to update feedback ❌");
    },
  });

  const handleFeedbackSubmit = (values: Feedback) => {
    mutate({
      id: values._id,
      status: values.status,
    });
  };

  return (
    <>
      {/* <div className="text-center text-[25px] font-bold mb-6">
        View Feedback
      </div> */}

      <Formik initialValues={initialValues} onSubmit={handleFeedbackSubmit}>
        {({ values, handleSubmit, setFieldValue }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
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
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              isLoading={isPending}
            >
              Update Status
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
