"use client";

import { Formik } from "formik";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
// validations
import { FeedbackSchema } from "./feedback-validation-schema";
// hooks
import { useCreateFeedbackMutation } from "@/data/feedback";
import { FeedbackCategoryType } from "@/types";

interface IFormValues {
  title: string;
  description: string;
  category: FeedbackCategoryType;
  name: string;
  email: string;
}

export const FeedbackForm = () => {
  const initialValues: IFormValues = {
    title: "",
    description: "",
    category: FeedbackCategoryType.BUG,
    name: "",
    email: "",
  };

  // mutations
  const { mutateAsync: createFeedback, isPending: isCreating } =
    useCreateFeedbackMutation();

  const handleFeedbackSubmit = async (
    values: IFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    await createFeedback(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">
        Submit Feedback
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={handleFeedbackSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Title"
                value={values.title}
                isInvalid={!!errors.title && !!touched.title}
                errorMessage={errors.title}
                onChange={handleChange("title")}
              />
              <Textarea
                variant="bordered"
                label="Description"
                value={values.description}
                maxLength={500}
                isInvalid={!!errors.description && !!touched.description}
                errorMessage={errors.description}
                onChange={handleChange("description")}
                description={`${values.description.length}/500 characters`}
              />
              <Select
                label="Category"
                variant="bordered"
                selectedKeys={values.category ? [values.category] : []}
                isInvalid={!!errors.category && !!touched.category}
                errorMessage={errors.category}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setFieldValue("category", selected);
                }}
              >
                {Object.values(FeedbackCategoryType).map((category) => (
                  <SelectItem key={category}>{category}</SelectItem>
                ))}
              </Select>
              <Input
                variant="bordered"
                label="Name"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange("name")}
              />
              <Input
                variant="bordered"
                label="Email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              disabled={isCreating}
            >
              Submit
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
