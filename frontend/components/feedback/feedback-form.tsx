"use client";

import axios from "axios";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
// validations
import { FeedbackSchema } from "./feedback-validation-schema";

interface IFormValues {
  title: string;
  description: string;
  category: string;
  name: string;
  email: string;
}

enum CategoryType {
  BUG = "Bug",
  FEATURE_REQUEST = "Feature Request",
  IMPROVEMENT = "Improvement",
  OTHER = "Other",
}

export const FeedbackForm = () => {
  const initialValues: IFormValues = {
    title: "",
    description: "",
    category: "",
    name: "",
    email: "",
  };

  const handleFeedbackSubmit = async (
    values: IFormValues,
    resetForm: () => void,
  ) => {
    try {
      const dataToSend = {
        title: values.title,
        description: values.description,
        category: values.category,
        name: values.name,
        email: values.email,
      };

      const response = await axios.post(
        "http://localhost:8080/api/feedbacks",
        dataToSend,
      );
      toast.success("Feedback submitted successfully 🎉");
      resetForm();
    } catch (error) {
      toast.error("Failed to submit feedback ❌");
    }
  };

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">
        Submit Feedback
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={(values, { resetForm }) =>
          handleFeedbackSubmit(values, resetForm)
        }
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
                isInvalid={!!errors.description && !!touched.description}
                errorMessage={errors.description}
                onChange={handleChange("description")}
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
                {Object.values(CategoryType).map((category) => (
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
            >
              Submit
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
