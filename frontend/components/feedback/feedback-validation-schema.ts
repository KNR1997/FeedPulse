import { object, ref, string } from "yup";

export const FeedbackSchema = object().shape({
  title: string().required("Title is required"),
  description: string()
    .min(20, "Must be at least 20 characters")
    .required("Description is required"),
  category: string().required("Category is required"),
  email: string().email('Invalid email address format'),
});
