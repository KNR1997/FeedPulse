import axios from "axios";
import Cookies from "js-cookie";
import { CreateFeedbackInput, LoginInput } from "@/types";
import { AUTH_CRED } from "@/utils/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    `${API_URL}/feedbacks?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.data;
};

export const getFeedback = async (feedbackId: string) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.get(
    `${API_URL}/feedbacks/${feedbackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.data;
};

export const createFeedback = async (data: CreateFeedbackInput) => {
  const res = await axios.post(`${API_URL}/feedbacks`, data);
  return res.data.data;
};

export const updateFeedback = async (id: string, data: { status: string }) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.put(
    `${API_URL}/feedbacks/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.data;
};

export const deleteFeedback = async (feedbackId: string) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.delete(
    `${API_URL}/feedbacks/${feedbackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.data;
};

export const login = async (data: LoginInput) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data.data;
};

export const retriggerFeedbackAnalysis = async (feedbackId: string) => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.post(
    `${API_URL}/feedbacks/${feedbackId}/analyze`,
    {}, // POST body can be empty
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getFeedbacksAnayltics = async () => {
  const token = Cookies.get(AUTH_CRED);

  const res = await axios.get(
    `${API_URL}/feedbacks/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data.data;
};
