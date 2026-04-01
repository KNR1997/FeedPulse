import axios from "axios";

export const getFeedbacks = async (filters?: {
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();

  if (filters?.category) params.append("category", filters.category);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const res = await axios.get(
    `http://localhost:8080/api/feedbacks?${params.toString()}`,
  );
  return res.data;
};

export const getFeedback = async (feedbackId: string) => {
  const res = await axios.get(
    `http://localhost:8080/api/feedbacks/${feedbackId}`,
  );
  return res.data;
};

export const updateFeedback = async (id: string, data: { status: string }) => {
  const res = await axios.put(
    `http://localhost:8080/api/feedbacks/${id}`,
    data,
  );
  return res.data;
};

export const deleteFeedback = async (feedbackId: string) => {
  const res = await axios.delete(
    `http://localhost:8080/api/feedbacks/${feedbackId}`,
  );
  return res.data;
};
