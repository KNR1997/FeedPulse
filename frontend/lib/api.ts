import axios from "axios";
import Cookies from "js-cookie";
import { LoginInput } from "@/types";
import { AUTH_CRED } from "@/utils/constants";

export const getFeedbacks = async (filters?: {
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  const token = Cookies.get(AUTH_CRED);

  if (filters?.category) params.append("category", filters.category);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const res = await axios.get(
    `http://localhost:8080/api/feedbacks?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getFeedback = async (feedbackId: string) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.get(
    `http://localhost:8080/api/feedbacks/${feedbackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const updateFeedback = async (id: string, data: { status: string }) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.put(
    `http://localhost:8080/api/feedbacks/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteFeedback = async (feedbackId: string) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.delete(
    `http://localhost:8080/api/feedbacks/${feedbackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const login = async (data: LoginInput) => {
  const res = await axios.post(`http://localhost:8080/api/auth/login`, data);
  return res.data;
};
